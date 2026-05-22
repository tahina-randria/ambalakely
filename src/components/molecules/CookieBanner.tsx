'use client';

import { useEffect, useState } from 'react';
import { X } from '@phosphor-icons/react/dist/ssr';
import { useConsent } from '@/lib/consent';
import { cn } from '@/lib/utils/cn';

/**
 * GDPR cookie banner. Renders only when the user has not made a choice
 * yet. Two main actions ("Tout accepter" / "Refuser") plus a
 * "Personnaliser" toggle for per-category controls.
 *
 * Footer-fixed, slim, non-blocking. Sand-12 surface on the dark site,
 * sand-1 typography. French copy per HANDOFF rule 13.
 */
export function CookieBanner() {
  const { hasChosen, accept, refuse } = useConsent();
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [errorTracking, setErrorTracking] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || hasChosen) return null;

  const onSave = () => accept({ analytics, errorTracking });

  return (
    <div
      role="dialog"
      aria-label="Préférences de cookies"
      className="fixed inset-x-0 bottom-0 z-[150] pointer-events-none"
    >
      <div className="mx-auto max-w-[680px] px-4 pb-4 md:pb-6 pointer-events-auto">
        <div className="bg-[var(--color-sand-12)] text-[var(--color-sand-1)] border border-[var(--color-sand-10)] shadow-2xl">
          <div className="px-5 md:px-7 py-5 md:py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-sand-7)]">
                Cookies
              </div>
              <button
                type="button"
                onClick={refuse}
                aria-label="Refuser et fermer"
                className="text-[var(--color-sand-7)] hover:text-[var(--color-sand-1)] transition-colors duration-[var(--duration-fast)]"
              >
                <X size={16} weight="regular" />
              </button>
            </div>

            <p className="mt-3 text-[14px] leading-[1.55] text-[var(--color-sand-3)] max-w-[520px]">
              Nous utilisons des outils de mesure d'audience anonyme et de suivi
              d'erreurs pour améliorer le site. Aucune publicité, aucun partage
              avec des tiers commerciaux.
            </p>

            {expanded ? (
              <fieldset className="mt-5 flex flex-col gap-3 border-t border-[var(--color-sand-10)] pt-5">
                <legend className="sr-only">Catégories de cookies</legend>
                <CategoryRow
                  id="cookie-analytics"
                  label="Mesure d'audience"
                  description="PostHog. Pages visitées, clics, parcours anonymisé."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <CategoryRow
                  id="cookie-errors"
                  label="Suivi d'erreurs"
                  description="Sentry. Erreurs JavaScript et incidents techniques."
                  checked={errorTracking}
                  onChange={setErrorTracking}
                />
              </fieldset>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => accept()}
                className="h-10 px-5 bg-[var(--color-sand-1)] text-[var(--color-sand-12)] font-body text-[14px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)]"
              >
                Tout accepter
              </button>
              <button
                type="button"
                onClick={refuse}
                className="h-10 px-5 border border-[var(--color-sand-7)] text-[var(--color-sand-1)] font-body text-[14px] font-medium transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:border-[var(--color-sand-1)]"
              >
                Refuser
              </button>
              {expanded ? (
                <button
                  type="button"
                  onClick={onSave}
                  className="h-10 px-5 text-[var(--color-sand-1)] font-body text-[14px] font-medium underline-offset-4 hover:underline transition-colors duration-[var(--duration-base)]"
                >
                  Enregistrer ma sélection
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className={cn(
                    'h-10 px-2 text-[var(--color-sand-5)] font-body text-[14px]',
                    'underline-offset-4 hover:underline hover:text-[var(--color-sand-1)]',
                    'transition-colors duration-[var(--duration-base)]',
                  )}
                >
                  Personnaliser
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[var(--color-sand-1)]"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-[14px] font-medium text-[var(--color-sand-1)]">
          {label}
        </span>
        <span className="text-[13px] leading-[1.5] text-[var(--color-sand-5)]">
          {description}
        </span>
      </span>
    </label>
  );
}
