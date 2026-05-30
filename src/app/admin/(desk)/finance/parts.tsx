'use client';
import type { ReactNode } from 'react';

// ── Format ──────────────────────────────────────────────────────────────────
export function fmtAr(minor: number): string {
  return `${new Intl.NumberFormat('fr-FR').format(Math.round(minor))} Ar`;
}

const GREEN = '#2f6b3e';
const RED = '#b3502e';

// ── Primitives (style Origin, à plat, sans ombre) ───────────────────────────
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-[11px] uppercase tracking-[0.12em] text-[var(--color-sand-9)] ${className}`}>{children}</div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[var(--color-sand-4)] bg-white p-5 ${className}`}>{children}</div>
  );
}

// ── Donut (segments multicolores, centre = total) ───────────────────────────
export function Donut({
  segments,
  centerTop,
  centerMain,
  size = 168,
}: {
  segments: { value: number; color: string }[];
  centerTop?: string;
  centerMain: string;
  size?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let acc = 0;
  const gap = 1.2;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 42 42" className="h-full w-full">
        <circle cx="21" cy="21" r="15.91549" fill="none" stroke="var(--color-sand-3)" strokeWidth="3.5" />
        {segments.map((s, i) => {
          const p = (s.value / total) * 100;
          const dash = Math.max(p - gap, 0.4);
          const offset = 25 - acc;
          acc += p;
          return (
            <circle
              key={i}
              cx="21"
              cy="21"
              r="15.91549"
              fill="none"
              stroke={s.color}
              strokeWidth="3.5"
              strokeDasharray={`${dash} ${100 - dash}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {centerTop ? <span className="text-[11px] text-[var(--color-sand-9)]">{centerTop}</span> : null}
        <span className="font-display text-[22px] tabular-nums text-[var(--color-sand-12)]">{centerMain}</span>
      </div>
    </div>
  );
}

export function Legend({ items, total }: { items: { label: string; amountMinor: number; color: string }[]; total: number }) {
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: it.color }} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] text-[var(--color-sand-12)]">{it.label}</div>
            <div className="text-[11px] tabular-nums text-[var(--color-sand-9)]">
              {total > 0 ? Math.round((it.amountMinor / total) * 100) : 0}%
            </div>
          </div>
          <span className="whitespace-nowrap text-[13px] tabular-nums text-[var(--color-sand-12)]">
            {fmtAr(it.amountMinor)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function IncExpNet({ income, expense }: { income: number; expense: number }) {
  const net = income - expense;
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Eyebrow>Revenus</Eyebrow>
        <div className="mt-2 font-display text-[24px] leading-none tabular-nums" style={{ color: GREEN }}>
          {fmtAr(income)}
        </div>
      </div>
      <div>
        <Eyebrow>Dépenses</Eyebrow>
        <div className="mt-2 font-display text-[24px] leading-none tabular-nums text-[var(--color-sand-12)]">
          {fmtAr(expense)}
        </div>
      </div>
      <div>
        <Eyebrow>Flux net</Eyebrow>
        <div
          className="mt-2 font-display text-[24px] leading-none tabular-nums"
          style={{ color: net >= 0 ? GREEN : RED }}
        >
          {net >= 0 ? '+ ' : '− '}
          {fmtAr(Math.abs(net))}
        </div>
      </div>
    </div>
  );
}

export function BudgetBar({ spent, budget }: { spent: number; budget: number }) {
  const ratio = budget > 0 ? Math.min(spent / budget, 1) : 0;
  const over = spent > budget;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[18px] tabular-nums text-[var(--color-sand-12)]">{fmtAr(spent)}</span>
        <span className="text-[13px] text-[var(--color-sand-9)]">sur {fmtAr(budget)}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-sand-3)]">
        <div
          className="h-2 rounded-full"
          style={{ width: `${Math.round(ratio * 100)}%`, backgroundColor: over ? RED : GREEN }}
        />
      </div>
      <div className="mt-1.5 text-[12px] text-[var(--color-sand-9)]">
        {budget > 0 ? Math.round((spent / budget) * 100) : 0}% du budget
      </div>
    </div>
  );
}

export function CategoryBars({ items, total }: { items: { label: string; amountMinor: number; color: string }[]; total: number }) {
  return (
    <div className="space-y-3">
      {items.map((it) => {
        const share = total > 0 ? it.amountMinor / total : 0;
        return (
          <div key={it.label}>
            <div className="flex justify-between text-[12px]">
              <span className="text-[var(--color-sand-11)]">{it.label}</span>
              <span className="tabular-nums text-[var(--color-sand-9)]">{fmtAr(it.amountMinor)}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--color-sand-3)]">
              <div className="h-1.5 rounded-full" style={{ width: `${Math.round(share * 100)}%`, backgroundColor: it.color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TxnRow({ label, sub, amountMinor, kind }: { label: string; sub: string; amountMinor: number; kind: 'income' | 'expense' }) {
  const income = kind === 'income';
  return (
    <div className="flex items-center gap-3 border-b border-[var(--color-sand-3)] py-2.5 last:border-0">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px]"
        style={income ? { background: '#eaf2ec', color: GREEN } : { background: 'var(--color-sand-3)', color: 'var(--color-sand-10)' }}
      >
        {income ? '↓' : '↑'}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] text-[var(--color-sand-12)]">{label}</div>
        <div className="text-[12px] text-[var(--color-sand-9)]">{sub}</div>
      </div>
      <span
        className="whitespace-nowrap text-[14px] tabular-nums"
        style={{ color: income ? GREEN : 'var(--color-sand-12)' }}
      >
        {income ? '+ ' : '− '}
        {fmtAr(amountMinor)}
      </span>
    </div>
  );
}

export function MonthBars({
  months,
  activeKey,
  onSelect,
}: {
  months: { key: string; label: string; incomeMinor: number; expenseMinor: number }[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  const max = Math.max(1, ...months.map((m) => Math.max(m.incomeMinor, m.expenseMinor)));
  return (
    <div className="flex gap-2">
      {months.map((m) => {
        const on = m.key === activeKey;
        return (
          <button
            key={m.key}
            type="button"
            onClick={() => onSelect(m.key)}
            className={`flex-1 rounded-xl border px-3 py-3 transition-colors ${
              on ? 'border-[var(--color-sand-12)] bg-white' : 'border-[var(--color-sand-4)] bg-white hover:bg-[var(--color-sand-2)]'
            }`}
          >
            <div className="flex h-12 items-end justify-center gap-1.5">
              <div className="w-3 rounded-t" style={{ height: `${(m.incomeMinor / max) * 100}%`, background: GREEN }} />
              <div className="w-3 rounded-t bg-[var(--color-sand-5)]" style={{ height: `${(m.expenseMinor / max) * 100}%` }} />
            </div>
            <div className={`mt-2 text-center text-[12px] ${on ? 'font-medium text-[var(--color-sand-12)]' : 'text-[var(--color-sand-9)]'}`}>
              {m.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function Tabs<T extends string>({ tabs, active, onChange }: { tabs: { key: T; label: string }[]; active: T; onChange: (k: T) => void }) {
  return (
    <div className="inline-flex gap-1 rounded-full border border-[var(--color-sand-4)] bg-[var(--color-sand-2)] p-0.5">
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={`rounded-full px-3 py-1 text-[12px] transition-colors ${
              on ? 'bg-white font-medium text-[var(--color-sand-12)]' : 'text-[var(--color-sand-9)] hover:text-[var(--color-sand-12)]'
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
