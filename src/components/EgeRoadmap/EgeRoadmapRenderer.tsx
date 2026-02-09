import type { EgeSubject } from '../../data/ege';
import type { EgePlanLength } from '../../lib/ege-plan';
import { buildEgeSchedule } from '../../lib/ege-plan';
import { useMemo } from 'react';

type EgeRoadmapRendererProps = {
  subject: EgeSubject;
  planMonths: EgePlanLength;
};

export function EgeRoadmapRenderer(props: EgeRoadmapRendererProps) {
  const { subject, planMonths } = props;

  const schedule = useMemo(
    () => buildEgeSchedule(subject, planMonths),
    [subject, planMonths],
  );
  const reviewByBlockIndex = useMemo(() => {
    const map = new Map<number, typeof schedule[number]>();
    schedule
      .filter((item) => item.type === 'review' && item.blockIndex !== undefined)
      .forEach((item) => {
        map.set(item.blockIndex as number, item);
      });
    return map;
  }, [schedule]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-blue-500/70" />

      <div className="space-y-20">
        {subject.blocks.map((block, blockIndex) => {
          const leftTopics = block.topics.filter(
            (_topic, index) => index % 2 === 0,
          );
          const rightTopics = block.topics.filter(
            (_topic, index) => index % 2 !== 0,
          );
          const rowCount = Math.max(leftTopics.length, rightTopics.length);
          const review = reviewByBlockIndex.get(blockIndex);

          return (
            <section key={block.title} className="relative">
              <div className="relative">
                <div className="mb-4 flex flex-col items-center">
                  <div className="mb-4 hidden h-9 w-9 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-xs font-semibold text-blue-700 lg:flex">
                    {blockIndex + 1}
                  </div>
                  <div className="rounded-2xl border-2 border-black bg-[#ffd100] px-6 py-3 text-center text-base font-semibold text-slate-900 shadow-[0_6px_0_0_rgba(0,0,0,0.08)]">
                    {block.title}
                  </div>
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute left-1/2 -top-4 hidden h-4 w-px -translate-x-1/2 bg-blue-500/70 lg:block" />
                  <div className="rounded-3xl border-2 border-black bg-white/90 px-6 py-8 shadow-[0_10px_0_0_rgba(0,0,0,0.06)]">
                    <div className="space-y-6">
                  {Array.from({ length: rowCount }).map((_, rowIndex) => {
                    const left = leftTopics[rowIndex];
                    const right = rightTopics[rowIndex];
                    const leftSchedule = left
                      ? schedule.find((item) => item.topicSlug === left.slug)
                      : undefined;
                    const rightSchedule = right
                      ? schedule.find((item) => item.topicSlug === right.slug)
                      : undefined;
                    return (
                      <div
                        key={`${block.title}-row-${rowIndex}`}
                        className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1fr,340px,1fr] lg:items-center"
                      >
                        <div className="relative flex lg:justify-end">
                          {left ? (
                            <>
                              <div className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-16 -translate-y-1/2 border-t-2 border-dotted border-blue-500 lg:block" />
                              <div className="pointer-events-none absolute right-[-7px] top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-blue-600 lg:block" />
                              <a
                                href={`/ege/${subject.slug}/${left.slug}`}
                                className="block w-full max-w-[480px] rounded-2xl border-2 border-black bg-[#ffe79b] px-5 py-4 text-slate-900 shadow-[0_6px_0_0_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:bg-[#ffefb6]"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="text-sm font-semibold">
                                    {left.title}
                                  </div>
                                  {leftSchedule && (
                                    <span className="text-xs font-semibold text-blue-700">
                                      {leftSchedule.dayStart ===
                                      leftSchedule.dayEnd
                                        ? `День ${leftSchedule.dayStart}`
                                        : `Дни ${leftSchedule.dayStart}-${leftSchedule.dayEnd}`}
                                    </span>
                                  )}
                                </div>
                                <div className="mt-1 text-xs text-slate-700">
                                  {left.description}
                                </div>
                              </a>
                            </>
                          ) : (
                            <div className="hidden lg:block h-16 w-full max-w-[480px]" />
                          )}
                        </div>

                        <div className="relative flex items-center justify-center">
                          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-blue-500/70 lg:block" />
                        </div>

                        <div className="relative flex lg:justify-start">
                          {right ? (
                            <>
                              <div className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-16 -translate-y-1/2 border-t-2 border-dotted border-blue-500 lg:block" />
                              <div className="pointer-events-none absolute left-[-7px] top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-blue-600 lg:block" />
                              <a
                                href={`/ege/${subject.slug}/${right.slug}`}
                                className="block w-full max-w-[480px] rounded-2xl border-2 border-black bg-[#ffe79b] px-5 py-4 text-slate-900 shadow-[0_6px_0_0_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:bg-[#ffefb6]"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="text-sm font-semibold">
                                    {right.title}
                                  </div>
                                  {rightSchedule && (
                                    <span className="text-xs font-semibold text-blue-700">
                                      {rightSchedule.dayStart ===
                                      rightSchedule.dayEnd
                                        ? `День ${rightSchedule.dayStart}`
                                        : `Дни ${rightSchedule.dayStart}-${rightSchedule.dayEnd}`}
                                    </span>
                                  )}
                                </div>
                                <div className="mt-1 text-xs text-slate-700">
                                  {right.description}
                                </div>
                              </a>
                            </>
                          ) : (
                            <div className="hidden lg:block h-16 w-full max-w-[480px]" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                      {review && (
                        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1fr,340px,1fr] lg:items-center">
                          <div className="hidden lg:block" />
                          <div className="relative flex items-center justify-center">
                            <div className="rounded-2xl border-2 border-blue-600 bg-white px-4 py-2 text-center text-xs font-semibold text-blue-700">
                              {review.dayStart === review.dayEnd
                                ? `День ${review.dayStart} • Повторение тем блока`
                                : `Дни ${review.dayStart}-${review.dayEnd} • Повторение тем блока`}
                              {review.reviewTopics && review.reviewTopics.length > 0 && (
                                <div className="mt-1 text-[11px] font-medium text-slate-600">
                                  {review.reviewTopics.join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="hidden lg:block" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
