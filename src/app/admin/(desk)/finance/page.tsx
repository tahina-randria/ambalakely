'use client';
import { useState } from 'react';
import { MONTHS, RECURRING, FREQUENT, CURRENT_KEY } from './demo-data';
import {
  Eyebrow,
  Card,
  Donut,
  Legend,
  IncExpNet,
  BudgetBar,
  CategoryBars,
  TxnRow,
  MonthBars,
  Tabs,
  fmtAr,
} from './parts';

function fmtShort(minor: number): string {
  const a = Math.abs(minor);
  if (a >= 1_000_000) return `${(minor / 1_000_000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M`;
  if (a >= 1_000) return `${Math.round(minor / 1000)} k`;
  return `${minor}`;
}

export default function FinancePage() {
  const [activeKey, setActiveKey] = useState(CURRENT_KEY);
  const [tab, setTab] = useState<'expense' | 'income'>('expense');

  const m = MONTHS.find((x) => x.key === activeKey) ?? MONTHS[MONTHS.length - 1];
  const cats = tab === 'expense' ? m.expenseCats : m.incomeCats;
  const catTotal = cats.reduce((s, c) => s + c.amountMinor, 0);
  const topExpenses = [...m.expenseCats].sort((a, b) => b.amountMinor - a.amountMinor).slice(0, 5);
  const txns = [...m.txns].sort((a, b) => b.day - a.day);

  return (
    <div className="max-w-[1100px]">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display font-light text-[28px] tracking-[-0.01em]">Finance</h1>
          <span className="rounded-full border border-[#caa64e] px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a6a1e]">
            Démo
          </span>
        </div>
        <span className="text-[12px] text-[var(--color-sand-8)]">Données de démonstration — à remplacer par le réel</span>
      </header>

      <div className="mb-4">
        <MonthBars months={MONTHS} activeKey={activeKey} onSelect={setActiveKey} />
      </div>

      <Card className="mb-4">
        <IncExpNet income={m.incomeMinor} expense={m.expenseMinor} />
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <Eyebrow>Répartition</Eyebrow>
            <Tabs
              tabs={[
                { key: 'expense', label: 'Dépenses' },
                { key: 'income', label: 'Revenus' },
              ]}
              active={tab}
              onChange={setTab}
            />
          </div>
          <div className="flex items-center gap-6">
            <Donut
              segments={cats.map((c) => ({ value: c.amountMinor, color: c.color }))}
              centerTop={tab === 'expense' ? 'Dépensé' : 'Encaissé'}
              centerMain={`${fmtShort(catTotal)}`}
            />
            <div className="min-w-0 flex-1">
              <Legend items={cats} total={catTotal} />
            </div>
          </div>
        </Card>

        <Card>
          <Eyebrow className="mb-4">Budget — dépenses</Eyebrow>
          <BudgetBar spent={m.expenseMinor} budget={m.budgetMinor} />
          <div className="mt-5 border-t border-[var(--color-sand-3)] pt-4">
            <CategoryBars items={topExpenses} total={m.expenseMinor} />
          </div>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <Eyebrow className="mb-2">Transactions — {m.label.toLowerCase()}</Eyebrow>
          <div>
            {txns.map((t, i) => (
              <TxnRow
                key={`${t.label}-${i}`}
                label={t.label}
                sub={`${t.category} · ${t.day} ${m.label.toLowerCase()}`}
                amountMinor={t.amountMinor}
                kind={t.kind}
              />
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <Eyebrow className="mb-2">Dépenses récurrentes</Eyebrow>
            <div>
              {RECURRING.map((r) => (
                <div key={r.label} className="flex items-center gap-3 border-b border-[var(--color-sand-3)] py-2.5 last:border-0">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] text-[var(--color-sand-12)]">{r.label}</div>
                    <div className="text-[12px] text-[var(--color-sand-9)]">{r.cadence}</div>
                  </div>
                  <span className="whitespace-nowrap text-[14px] tabular-nums text-[var(--color-sand-12)]">
                    {fmtAr(r.amountMinor)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <Eyebrow className="mb-3">Plus fréquentes</Eyebrow>
            <div className="grid grid-cols-3 gap-2">
              {FREQUENT.map((f) => (
                <div key={f.label} className="rounded-xl border border-[var(--color-sand-4)] p-3 text-center">
                  <div className="font-display text-[18px] tabular-nums text-[var(--color-sand-12)]">{f.count}×</div>
                  <div className="mt-1 text-[11px] leading-tight text-[var(--color-sand-9)]">{f.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
