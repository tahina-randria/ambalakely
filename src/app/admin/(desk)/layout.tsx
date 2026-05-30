import Image from 'next/image';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabase/server';
import { isStaffEmail } from '@/lib/auth/staff';
import { signOut } from '../actions';
import { DeskNav } from './DeskNav';

export default async function DeskLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth: the middleware already gates /admin, but never trust a
  // single check for a privileged surface.
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isStaffEmail(user.email)) redirect('/admin/login');

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col border-r border-[var(--color-sand-4)]">
        <div className="flex items-center gap-2.5 px-6 py-6">
          <Image
            src="/brand/logo-white.png"
            alt=""
            width={30}
            height={30}
            className="h-[30px] w-[30px] invert"
          />
          <span className="font-display font-light text-[17px] tracking-[-0.01em] text-[var(--color-sand-12)]">
            Hôtel Ambalakely
          </span>
        </div>
        <DeskNav />
        <div className="mt-auto border-t border-[var(--color-sand-4)] px-6 py-4">
          <div className="mb-2 truncate text-[12px] text-[var(--color-sand-9)]" title={user.email ?? ''}>
            {user.email}
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="text-[13px] text-[var(--color-sand-9)] underline-offset-2 hover:text-[var(--color-sand-12)] hover:underline"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-x-auto px-8 py-7">{children}</main>
    </div>
  );
}
