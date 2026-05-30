'use client';
import Image from 'next/image';
import { useActionState } from 'react';
import { sendMagicLink, type LoginState } from './actions';

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(sendMagicLink, null);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-[330px]">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <Image
            src="/brand/logo-white.png"
            alt="Hôtel Ambalakely"
            width={56}
            height={56}
            priority
            className="h-14 w-14 invert"
          />
          <span className="font-display font-light text-[16px] tracking-[-0.015em] text-[var(--color-sand-12)]">
            Hôtel Ambalakely
          </span>
        </div>

        {state?.ok ? (
          <p className="text-center text-[14px] leading-[1.6] text-[var(--color-sand-10)]">
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
              className="h-12 w-full border border-[var(--color-sand-6)] bg-transparent px-4 text-[15px] text-[var(--color-sand-12)] placeholder:text-[var(--color-sand-8)] outline-none focus:border-[var(--color-sand-10)]"
            />
            {state && !state.ok ? (
              <p role="alert" className="text-[13px] text-[#c0392b]">
                {state.message}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="h-12 w-full bg-[var(--color-sand-12)] text-[15px] font-medium text-[var(--color-sand-1)] transition-colors hover:bg-[var(--color-sand-11)] disabled:opacity-60"
            >
              {pending ? 'Envoi…' : 'Recevoir le lien'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
