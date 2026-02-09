import { useEffect, useMemo, useState } from 'react';
import type { EgeSubject } from '../../data/ege';
import type { EgePlanLength } from '../../lib/ege-plan';
import { EgeRoadmapRenderer } from './EgeRoadmapRenderer';

type EgePlanRoadmapShellProps = {
  subject: EgeSubject;
};

const PLAN_OPTIONS: { value: EgePlanLength; label: string }[] = [
  { value: 3, label: '3 месяца' },
  { value: 6, label: '6 месяцев' },
  { value: 12, label: '12 месяцев' },
];

function getStoredPlan(subjectSlug: string): EgePlanLength | null {
  const raw = localStorage.getItem(`ege-plan-${subjectSlug}`);
  if (!raw) return null;
  const value = Number(raw);
  if (value === 3 || value === 6 || value === 12) return value;
  return null;
}

function setStoredPlan(subjectSlug: string, value: EgePlanLength) {
  localStorage.setItem(`ege-plan-${subjectSlug}`, String(value));
}

export function EgePlanRoadmapShell(props: EgePlanRoadmapShellProps) {
  const { subject } = props;
  const subjectSlug = useMemo(() => subject.slug, [subject.slug]);
  const [selectedPlan, setSelectedPlan] = useState<EgePlanLength | null>(null);
  const [isChoosingPlan, setIsChoosingPlan] = useState(false);

  useEffect(() => {
    const stored = getStoredPlan(subjectSlug);
    if (stored) {
      setSelectedPlan(stored);
    }
  }, [subjectSlug]);

  useEffect(() => {
    if (selectedPlan) {
      setStoredPlan(subjectSlug, selectedPlan);
    }
  }, [selectedPlan, subjectSlug]);

  return (
    <div>
      <div className="mb-6 rounded-2xl border-2 border-black bg-[#fff4c4] px-5 py-4 text-slate-900 shadow-[0_6px_0_0_rgba(0,0,0,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">План подготовки</div>
            <div className="text-xs text-slate-700">
              Выбери продолжительность. После выбора появится дорожная карта.
            </div>
          </div>
          <button
            type="button"
            className="rounded-full border-2 border-black bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-slate-900"
            onClick={() => setIsChoosingPlan((prev) => !prev)}
          >
            Выбрать план
          </button>
        </div>

        {isChoosingPlan && (
          <div className="mt-4 flex flex-wrap gap-2">
            {PLAN_OPTIONS.map((plan) => (
              <button
                key={plan.value}
                type="button"
                onClick={() => {
                  setSelectedPlan(plan.value);
                  setIsChoosingPlan(false);
                }}
                className={[
                  'rounded-full border-2 px-4 py-2 text-xs font-semibold transition',
                  selectedPlan === plan.value
                    ? 'border-black bg-black text-white'
                    : 'border-black bg-white text-black hover:bg-slate-100',
                ].join(' ')}
              >
                {plan.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedPlan ? (
        <EgeRoadmapRenderer subject={subject} planMonths={selectedPlan} />
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-8 text-center text-sm text-slate-500">
          Выбери план подготовки, чтобы увидеть дорожную карту.
        </div>
      )}
    </div>
  );
}

