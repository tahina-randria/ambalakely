'use server';
import { revalidatePath } from 'next/cache';
import { createSupabaseServer } from '@/lib/supabase/server';
import { isStaffEmail } from '@/lib/auth/staff';
import { setReservationStatus } from '@/lib/db/admin-reservations';

/** Re-verify staff on every mutation — never trust the client or the page. */
async function requireStaff(): Promise<string> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isStaffEmail(user.email)) throw new Error('non autorisé');
  return user.email as string;
}

export async function confirmReservation(formData: FormData) {
  const actor = await requireStaff();
  await setReservationStatus(String(formData.get('id')), 'confirmed', actor, 'pending');
  revalidatePath('/admin');
}

export async function cancelReservation(formData: FormData) {
  const actor = await requireStaff();
  await setReservationStatus(String(formData.get('id')), 'cancelled', actor);
  revalidatePath('/admin');
}
