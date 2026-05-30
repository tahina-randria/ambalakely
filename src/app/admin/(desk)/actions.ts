'use server';
import { revalidatePath } from 'next/cache';
import { createSupabaseServer } from '@/lib/supabase/server';
import { isStaffEmail } from '@/lib/auth/staff';
import { getReservation, setReservationStatus } from '@/lib/db/admin-reservations';
import { FROM_EMAIL, HOTEL_REPLY_TO, getResend } from '@/lib/email/client';
import { BookingConfirmed, BOOKING_CONFIRMED_SUBJECT } from '@/lib/email/templates/BookingConfirmed';
import type { EmailLocale } from '@/lib/email/templates/_shared';

/** Re-verify staff on every mutation — never trust the client or the page. */
async function requireStaff(): Promise<string> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isStaffEmail(user.email)) throw new Error('non autorisé');
  return user.email as string;
}

/**
 * Ferme la boucle promise dans l'accusé de réception (« Hasina ou Mamy vous
 * confirmera ») : à la confirmation, on prévient le client dans SA langue.
 * Best-effort — le statut est déjà confirmé, un couac e-mail ne doit pas
 * faire échouer l'action.
 */
async function sendConfirmationEmail(id: string): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.error('[admin/confirm] RESEND_API_KEY manquant — confirmation non envoyée');
    return;
  }
  const r = await getReservation(id);
  if (!r || !r.email) return;
  const locale: EmailLocale = r.locale === 'en' || r.locale === 'no' ? r.locale : 'fr';
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: r.email,
    replyTo: HOTEL_REPLY_TO,
    subject: BOOKING_CONFIRMED_SUBJECT[locale],
    react: BookingConfirmed({
      arrival: r.checkIn,
      departure: r.checkOut,
      guests: r.adults + r.children,
      name: `${r.firstName} ${r.lastName}`.trim(),
      reference: r.reference,
      room: r.rooms.map((x) => x.name).join(', ') || undefined,
      locale,
    }),
  });
  if (error) console.error('[admin/confirm] envoi e-mail', error);
}

export async function confirmReservation(formData: FormData) {
  const actor = await requireStaff();
  const id = String(formData.get('id'));
  await setReservationStatus(id, 'confirmed', actor, 'pending');
  try {
    await sendConfirmationEmail(id);
  } catch (err) {
    console.error('[admin/confirm] e-mail best-effort', err);
  }
  revalidatePath('/admin');
  revalidatePath(`/admin/reservations/${id}`);
}

export async function cancelReservation(formData: FormData) {
  const actor = await requireStaff();
  const id = String(formData.get('id'));
  await setReservationStatus(id, 'cancelled', actor);
  revalidatePath('/admin');
  revalidatePath(`/admin/reservations/${id}`);
}
