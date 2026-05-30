import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabase/server';
import { isStaffEmail } from '@/lib/auth/staff';
import { signOut } from '../actions';

// The platform's information architecture (think Mews) — only "Réservations"
// is live for now; the rest signal where this grows (ops → finance → …).
const NAV: { label: string; href: string; soon?: boolean }[] = [
  { label: 'Réservations', href: '/admin' },
  { label: 'Calendrier', href: '#', soon: true },
  { label: 'Tarifs', href: '#', soon: true },
  { label: 'Finance', href: '#', soon: true },
];

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
      <aside className="flex w-60 shrink-0 flex-col border-r border-[var(--color-sand-10)]">
        <div className="px-6 py-6">
          <div className="font-medium text-[11px] uppercase tracking-[0.14em] text-[var(--color-sand-6)]">
            Hôtel Ambalakely
          </div>
          <div className="font-display font-light text-[22px] tracking-[-0.01em]">Régie</div>
        </div>
        <nav className="flex flex-col px-3">
          {NAV.map((item) =>
            item.soon ? (
              <span
                key={item.label}
                className="flex items-center justify-between rounded px-3 py-2 text-[14px] text-[var(--color-sand-7)]"
              >
                {item.label}
                <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-sand-8)]">
                  bientôt
                </span>
              </span>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="rounded px-3 py-2 text-[14px] text-[var(--color-sand-1)] hover:bg-[var(--color-sand-11)]"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>
        <div className="mt-auto border-t border-[var(--color-sand-10)] px-6 py-4">
          <div className="mb-2 truncate text-[12px] text-[var(--color-sand-6)]" title={user.email ?? ''}>
            {user.email}
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="text-[13px] text-[var(--color-sand-5)] underline-offset-2 hover:text-[var(--color-sand-1)] hover:underline"
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
