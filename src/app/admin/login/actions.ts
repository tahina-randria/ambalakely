'use server';
import { headers } from 'next/headers';
import { createSupabaseServer } from '@/lib/supabase/server';
import { isStaffEmail } from '@/lib/auth/staff';

export type LoginState = { ok: boolean; message: string } | null;

/**
 * Sends a magic link — but only if the email is on the staff allowlist.
 * Returns an identical response either way (no account enumeration): a
 * stranger can't tell whether an address is staff. The user authenticates
 * themselves by clicking the link in their own inbox; we never set passwords
 * or create accounts programmatically beyond Supabase's own passwordless flow.
 */
export async function sendMagicLink(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();

  if (!email || !email.includes('@')) {
    return { ok: false, message: 'Adresse e-mail invalide.' };
  }

  if (isStaffEmail(email)) {
    const h = await headers();
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const host = h.get('host');
    const origin = `${proto}://${host}`;
    const supabase = await createSupabaseServer();
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${origin}/admin/auth/callback`, shouldCreateUser: true },
    });
  }

  return {
    ok: true,
    message: 'Si cette adresse est autorisée, un lien de connexion vient d’être envoyé. Vérifiez votre boîte de réception.',
  };
}
