import 'server-only';
import { sql } from 'drizzle-orm';
import { db, dbWrite } from '@/lib/db';

/**
 * Staff status transition (confirm / cancel / …). Atomic: flips the status and
 * writes an audit event in one transaction. Cancelling fires the DB trigger
 * `reservation_sync_blocks` (after update of status) which releases the held
 * room. `expectedFrom` guards against acting on a stale row (e.g. confirming
 * something already cancelled).
 */
export async function setReservationStatus(
  id: string,
  status: 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out' | 'no_show',
  actor: string,
  expectedFrom?: string,
): Promise<void> {
  await dbWrite.transaction(async (tx) => {
    const updated = (await tx.execute(sql`
      update reservation set status = ${status}
      where id = ${id}::uuid
        ${expectedFrom ? sql`and status = ${expectedFrom}` : sql``}
      returning id
    `)) as unknown as { id: string }[];
    if (updated.length === 0) {
      throw new Error('réservation introuvable ou déjà dans un autre état');
    }
    await tx.execute(sql`
      insert into reservation_event (reservation_id, type, actor, data)
      values (${id}::uuid, ${status}, ${actor}, ${JSON.stringify({ via: 'admin' })}::jsonb)
    `);
  });
}

/**
 * Staff-facing reservation read model. Runs on the privileged Postgres
 * connection (bypasses RLS) — access is gated upstream by the /admin auth
 * middleware + the desk layout, never exposed to the public.
 */
export type AdminReservation = {
  id: string;
  reference: string;
  status: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  totalMinor: number;
  currency: string;
  channel: string;
  createdAt: string;
  holdExpiresAt: string | null;
  /** Secondes restantes avant l'expiration du hold (négatif = expiré, null = pas de hold). */
  holdSecondsLeft: number | null;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  rooms: string;
};

export async function listReservations(): Promise<AdminReservation[]> {
  const rows = (await db.execute(sql`
    select r.id, r.reference, r.status,
           r.check_in::text   as check_in,
           r.check_out::text  as check_out,
           (r.check_out - r.check_in) as nights,
           r.adults, r.children, r.total_minor, r.currency, r.channel,
           r.created_at::text       as created_at,
           r.hold_expires_at::text  as hold_expires_at,
           extract(epoch from (r.hold_expires_at - now()))::int as hold_seconds_left,
           g.first_name, g.last_name, g.email, g.phone,
           coalesce(
             (select string_agg(rt.name, ', ' order by rt.name)
              from reservation_room rr
              join room_type rt on rt.id = rr.room_type_id
              where rr.reservation_id = r.id),
             '—'
           ) as rooms
    from reservation r
    join guest g on g.id = r.guest_id
    order by (r.status = 'pending') desc, r.check_in asc, r.created_at desc
    limit 100
  `)) as unknown as Record<string, unknown>[];

  return rows.map((r) => ({
    id: String(r.id),
    reference: String(r.reference),
    status: String(r.status),
    checkIn: String(r.check_in),
    checkOut: String(r.check_out),
    nights: Number(r.nights),
    adults: Number(r.adults),
    children: Number(r.children),
    totalMinor: Number(r.total_minor),
    currency: String(r.currency),
    channel: String(r.channel),
    createdAt: String(r.created_at),
    holdExpiresAt: r.hold_expires_at ? String(r.hold_expires_at) : null,
    holdSecondsLeft: r.hold_seconds_left != null ? Number(r.hold_seconds_left) : null,
    firstName: String(r.first_name),
    lastName: String(r.last_name),
    email: r.email ? String(r.email) : null,
    phone: r.phone ? String(r.phone) : null,
    rooms: String(r.rooms),
  }));
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ReservationRoomLine = {
  name: string;
  adults: number;
  children: number;
  amountMinor: number;
  stayType: string;
};

/** Une ligne du journal d'audit (created / confirmed / cancelled / …). */
export type ReservationEvent = {
  id: string;
  type: string;
  actor: string | null;
  data: Record<string, unknown>;
  /** Déjà formaté dans le fuseau de l'hôtel (Indian/Antananarivo). */
  createdAtLabel: string;
};

export type AdminReservationDetail = {
  id: string;
  reference: string;
  status: string;
  channel: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  totalMinor: number;
  currency: string;
  /** Message laissé par le client à la réservation (reservation.notes). */
  notes: string | null;
  holdExpiresAt: string | null;
  holdSecondsLeft: number | null;
  createdAtLabel: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  country: string | null;
  rooms: ReservationRoomLine[];
};

/**
 * Détail d'une réservation pour le desk. Renvoie `null` si l'id n'est pas un
 * UUID (évite un 500 sur une URL bidon) ou si la résa n'existe pas → 404.
 * Les horodatages sont formatés côté base dans le fuseau de l'hôtel.
 */
export async function getReservation(id: string): Promise<AdminReservationDetail | null> {
  if (!UUID_RE.test(id)) return null;
  const rows = (await db.execute(sql`
    select r.id, r.reference, r.status, r.channel,
           r.check_in::text  as check_in,
           r.check_out::text as check_out,
           (r.check_out - r.check_in) as nights,
           r.adults, r.children, r.total_minor, r.currency, r.notes,
           r.hold_expires_at::text as hold_expires_at,
           extract(epoch from (r.hold_expires_at - now()))::int as hold_seconds_left,
           to_char(r.created_at at time zone 'Indian/Antananarivo', 'DD/MM/YYYY HH24:MI') as created_at_label,
           g.first_name, g.last_name, g.email, g.phone, g.country
    from reservation r
    join guest g on g.id = r.guest_id
    where r.id = ${id}::uuid
  `)) as unknown as Record<string, unknown>[];
  const r = rows[0];
  if (!r) return null;

  const roomRows = (await db.execute(sql`
    select rt.name, rr.adults, rr.children, rr.amount_minor, rr.stay_type
    from reservation_room rr
    join room_type rt on rt.id = rr.room_type_id
    where rr.reservation_id = ${id}::uuid
    order by rt.name
  `)) as unknown as Record<string, unknown>[];

  return {
    id: String(r.id),
    reference: String(r.reference),
    status: String(r.status),
    channel: String(r.channel),
    checkIn: String(r.check_in),
    checkOut: String(r.check_out),
    nights: Number(r.nights),
    adults: Number(r.adults),
    children: Number(r.children),
    totalMinor: Number(r.total_minor),
    currency: String(r.currency),
    notes: r.notes ? String(r.notes) : null,
    holdExpiresAt: r.hold_expires_at ? String(r.hold_expires_at) : null,
    holdSecondsLeft: r.hold_seconds_left != null ? Number(r.hold_seconds_left) : null,
    createdAtLabel: String(r.created_at_label),
    firstName: String(r.first_name),
    lastName: String(r.last_name),
    email: r.email ? String(r.email) : null,
    phone: r.phone ? String(r.phone) : null,
    country: r.country ? String(r.country) : null,
    rooms: roomRows.map((x) => ({
      name: String(x.name),
      adults: Number(x.adults),
      children: Number(x.children),
      amountMinor: Number(x.amount_minor),
      stayType: String(x.stay_type),
    })),
  };
}

/** Journal d'audit d'une réservation, du plus ancien au plus récent. */
export async function getReservationEvents(id: string): Promise<ReservationEvent[]> {
  if (!UUID_RE.test(id)) return [];
  const rows = (await db.execute(sql`
    select e.id, e.type, e.actor, e.data,
           to_char(e.created_at at time zone 'Indian/Antananarivo', 'DD/MM/YYYY HH24:MI') as created_at_label
    from reservation_event e
    where e.reservation_id = ${id}::uuid
    order by e.created_at asc, e.id asc
  `)) as unknown as Record<string, unknown>[];
  return rows.map((e) => ({
    id: String(e.id),
    type: String(e.type),
    actor: e.actor ? String(e.actor) : null,
    data: e.data && typeof e.data === 'object' ? (e.data as Record<string, unknown>) : {},
    createdAtLabel: String(e.created_at_label),
  }));
}
