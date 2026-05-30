'use client';
import { useActionState } from 'react';
import { sendMagicLink, type LoginState } from './actions';

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(sendMagicLink, null);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        <div className="mb-1 font-medium text-[12px] uppercase tracking-[0.14em] text-[var(--color-sand-6)]">
          Hôtel Ambalakely
        </div>
        <h1 className="mb-2 font-display font-light text-[34px] leading-[1.05] tracking-[-0.02em]">
          Régie
        </h1>
        <p className="mb-8 text-[14px] leading-[1.6] text-[var(--color-sand-5)]">
          Accès réservé à l’équipe. Entrez votre e-mail, nous vous envoyons un lien de connexion.
        </p>

        {state?.ok ? (
          <p className="border border-[var(--color-sand-10)] px-4 py-3 text-[14px] leading-[1.6] text-[var(--color-sand-3)]">
            {state.message}
          </p>
        ) : (
          <form action={formAction} className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              autoFocus
              placeholder="vous@exemple.com"
              className="h-12 w-full border border-[var(--color-sand-10)] bg-transparent px-4 text-[15px] text-[var(--color-sand-1)] placeholder:text-[var(--color-sand-7)] outline-none focus:border-[var(--color-sand-5)]"
            />
            {state && !state.ok ? (
              <p role="alert" className="text-[13px] text-[#ef4444]">
                {state.message}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="h-12 w-full bg-[var(--color-sand-1)] text-[15px] font-medium text-[var(--color-sand-12)] transition-colors hover:bg-[var(--color-sand-3)] disabled:opacity-60"
            >
              {pending ? 'Envoi…' : 'Recevoir le lien'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
