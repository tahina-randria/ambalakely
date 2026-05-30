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
    firstName: String(r.first_name),
    lastName: String(r.last_name),
    email: r.email ? String(r.email) : null,
    phone: r.phone ? String(r.phone) : null,
    rooms: String(r.rooms),
  }));
}
