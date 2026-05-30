import { randomBytes } from 'node:crypto';
import { sql, type SQL } from 'drizzle-orm';
import { getAvailability } from './availability';

/**
 * Création de réservation — transaction SERIALIZABLE.
 *
 * Le `EXCLUDE` ne garde que les chambres assignées ; une réservation par TYPE
 * (chambre non assignée) est protégée par : re-check de dispo DANS la
 * transaction + isolation serializable (deux résas concurrentes qui
 * survendraient le même type → l'une échoue en 40001 → retry → re-check rejette).
 * Réf `AMB-xxxxx`, statut `pending` (demande à valider), hold (défaut 48 h).
 *
 * Incrément 1 : nuitées (overnight). Day-use à venir.
 */
export type RoomRequest = {
  roomTypeSlug: 'superieure' | 'confort' | 'standard';
  adults: number;
  children?: number;
  /** Optionnel : assigner une chambre physique précise (sinon par type). */
  roomCode?: string;
};

export type CreateReservationInput = {
  checkIn: string; // 'YYYY-MM-DD'
  checkOut: string;
  guest: { firstName: string; lastName: string; email?: string; phone?: string; country?: string };
  rooms: RoomRequest[];
  channel?: 'direct' | 'email' | 'phone' | 'walk_in' | 'ota';
  notes?: string;
  holdHours?: number;
  propertySlug?: string;
};

export type CreatedReservation = {
  id: string;
  reference: string;
  status: string;
  totalMinor: number;
  currency: string;
};

type TxExec = { execute: (q: SQL) => Promise<unknown> };
type WriteDb = {
  transaction: <T>(
    fn: (tx: TxExec) => Promise<T>,
    config?: { isolationLevel?: 'serializable' },
  ) => Promise<T>;
};

const REF_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // sans I, L, O, 0, 1
function genReference(): string {
  const b = randomBytes(6);
  let s = '';
  for (let i = 0; i < 6; i++) s += REF_ALPHABET[b[i] % REF_ALPHABET.length];
  return `AMB-${s}`;
}

function isRetryable(e: unknown): boolean {
  const code = (e as { code?: string }).code;
  // 40001 serialization_failure · 40P01 deadlock · 23P01 exclusion_violation
  // · 23505 unique_violation (collision de référence)
  return code === '40001' || code === '40P01' || code === '23P01' || code === '23505';
}

export async function createReservation(
  dbw: WriteDb,
  input: CreateReservationInput,
): Promise<CreatedReservation> {
  const {
    checkIn,
    checkOut,
    guest,
    rooms,
    channel = 'direct',
    notes,
    holdHours = 48,
    propertySlug = 'ambalakely',
  } = input;

  if (rooms.length === 0) throw new Error('au moins une chambre requise');
  const nights = Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 86_400_000);
  if (!Number.isFinite(nights) || nights < 1) throw new Error('check_out doit être après check_in');

  for (let attempt = 0; ; attempt++) {
    try {
      return await dbw.transaction(
        async (tx) => {
          const [prop] = (await tx.execute(
            sql`select id, check_in_time::text as check_in_time, check_out_time::text as check_out_time,
                       timezone, currency
                from property where slug = ${propertySlug}`,
          )) as unknown as {
            id: string;
            check_in_time: string;
            check_out_time: string;
            timezone: string;
            currency: string;
          }[];
          if (!prop) throw new Error(`property '${propertySlug}' introuvable`);

          const typeRows = (await tx.execute(
            sql`select id, slug, base_price_minor, max_occupancy
                from room_type where property_id = ${prop.id}`,
          )) as unknown as {
            id: string;
            slug: string;
            base_price_minor: string;
            max_occupancy: number;
          }[];
          const byType = new Map(typeRows.map((t) => [t.slug, t]));

          // re-check dispo (overnight) DANS la transaction serializable
          const avail = await getAvailability(tx, { checkIn, checkOut, propertySlug });
          const availBySlug = new Map(avail.map((a) => [a.slug, a.available]));

          const wanted = new Map<string, number>();
          for (const r of rooms) {
            const t = byType.get(r.roomTypeSlug);
            if (!t) throw new Error(`type inconnu : ${r.roomTypeSlug}`);
            const occ = r.adults + (r.children ?? 0);
            if (occ > t.max_occupancy)
              throw new Error(`${r.roomTypeSlug} : ${occ} pers. > capacité ${t.max_occupancy}`);
            wanted.set(r.roomTypeSlug, (wanted.get(r.roomTypeSlug) ?? 0) + 1);
          }
          for (const [slug, n] of wanted) {
            const have = availBySlug.get(slug) ?? 0;
            if (n > have) throw new Error(`indisponible : ${slug} demandé ${n}, dispo ${have}`);
          }

          const [plan] = (await tx.execute(
            sql`select id from rate_plan where property_id = ${prop.id} and is_default limit 1`,
          )) as unknown as { id: string }[];

          const [g] = (await tx.execute(
            sql`insert into guest (property_id, first_name, last_name, email, phone, country)
                values (${prop.id}, ${guest.firstName}, ${guest.lastName}, ${guest.email ?? null},
                        ${guest.phone ?? null}, ${guest.country ?? null})
                returning id`,
          )) as unknown as { id: string }[];

          const totalAdults = rooms.reduce((a, r) => a + r.adults, 0);
          const totalChildren = rooms.reduce((a, r) => a + (r.children ?? 0), 0);
          const totalMinor = rooms.reduce(
            (a, r) => a + nights * Number(byType.get(r.roomTypeSlug)!.base_price_minor),
            0,
          );

          const reference = genReference();
          const [res] = (await tx.execute(
            sql`insert into reservation
                  (property_id, reference, guest_id, status, channel, check_in, check_out,
                   adults, children, currency, total_minor, notes, hold_expires_at)
                values (${prop.id}, ${reference}, ${g.id}, 'pending', ${channel},
                        ${checkIn}::date, ${checkOut}::date, ${totalAdults}, ${totalChildren},
                        ${prop.currency}, ${totalMinor}, ${notes ?? null},
                        now() + make_interval(hours => ${holdHours}))
                returning id, reference, status, total_minor`,
          )) as unknown as {
            id: string;
            reference: string;
            status: string;
            total_minor: string;
          }[];

          for (const r of rooms) {
            const t = byType.get(r.roomTypeSlug)!;
            let roomId: string | null = null;
            if (r.roomCode) {
              const [room] = (await tx.execute(
                sql`select id from room
                    where property_id = ${prop.id} and code = ${r.roomCode}
                      and room_type_id = ${t.id} and is_active`,
              )) as unknown as { id: string }[];
              if (!room) throw new Error(`chambre ${r.roomCode} introuvable pour ${r.roomTypeSlug}`);
              roomId = room.id;
            }
            await tx.execute(
              sql`insert into reservation_room
                    (reservation_id, room_type_id, room_id, rate_plan_id, stay_type,
                     check_in_at, check_out_at, adults, children, amount_minor, currency)
                  values (${res.id}, ${t.id}, ${roomId}, ${plan?.id ?? null}, 'overnight',
                          (${checkIn}::date + ${prop.check_in_time}::time) at time zone ${prop.timezone},
                          (${checkOut}::date + ${prop.check_out_time}::time) at time zone ${prop.timezone},
                          ${r.adults}, ${r.children ?? 0}, ${nights * Number(t.base_price_minor)},
                          ${prop.currency})`,
            );
          }

          await tx.execute(
            sql`insert into reservation_event (reservation_id, type, actor, data)
                values (${res.id}, 'created', ${channel},
                        ${JSON.stringify({ rooms: rooms.length, nights })}::jsonb)`,
          );

          return {
            id: res.id,
            reference: res.reference,
            status: res.status,
            totalMinor: Number(res.total_minor),
            currency: prop.currency,
          };
        },
        { isolationLevel: 'serializable' },
      );
    } catch (e) {
      if (isRetryable(e) && attempt < 4) continue;
      throw e;
    }
  }
}
