import { cn } from '../../lib/classname.ts';
import { roadmapProgress, totalRoadmapNodes } from '../../stores/roadmap.ts';
import { useStore } from '@nanostores/react';
import { Calendar, X } from 'lucide-react';
import { useState } from 'react';
import { ScheduleEventModal } from '../Schedule/ScheduleEventModal.tsx';

type ProgressNudgeProps = {
  resourceType: 'roadmap' | 'best-practice';
  resourceId: string;
};

export function ProgressNudge(props: ProgressNudgeProps) {
  const { resourceId, resourceType } = props;

  const [isNudgeHidden, setIsNudgeHidden] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const $totalRoadmapNodes = useStore(totalRoadmapNodes);
  const $roadmapProgress = useStore(roadmapProgress);

  const done =
    ($roadmapProgress?.done?.length || 0) +
    ($roadmapProgress?.skipped?.length || 0);

  const hasProgress = done > 0;

  if (!$totalRoadmapNodes || isNudgeHidden) {
    return null;
  }

  return (
    <>
      {isScheduleModalOpen && (
        <ScheduleEventModal
          onClose={() => {
            setIsScheduleModalOpen(false);
          }}
          roadmapId={resourceId}
        />
      )}
      <div
        className={
          'fixed bottom-5 left-1/2 -translate-x-1/4 z-30 hidden transform animate-fade-slide-up flex-row gap-1.5 transition-all duration-300 lg:flex'
        }
      >
        <div
          className={
            'relative overflow-hidden rounded-full bg-stone-900 px-4 py-2 text-center text-white shadow-2xl'
          }
        >
          <span
            className={cn('flex items-center', {
              hidden: hasProgress,
            })}
          >
            <span className="mr-2 text-sm font-semibold uppercase text-yellow-400">
              Tip
            </span>
            <span className="text-sm text-gray-200">
              Right-click a topic to mark it as done &nbsp;
            </span>
          </span>
          <span
            className={cn('relative z-20 block text-sm', {
              hidden: !hasProgress,
            })}
          >
            <span className="relative -top-[0.45px] mr-2 text-xs font-medium uppercase text-yellow-400">
              Progress
            </span>
            <span>{done > $totalRoadmapNodes ? $totalRoadmapNodes : done}</span>{' '}
            of <span>{$totalRoadmapNodes}</span> Done
          </span>

          <span
            className="absolute bottom-0 left-0 top-0 z-10 bg-stone-700"
            style={{
              width: `${(done / $totalRoadmapNodes) * 100}%`,
            }}
          ></span>
        </div>
        {resourceType === 'roadmap' && (
          <button
            onClick={() => {
              setIsScheduleModalOpen(true);
            }}
            className="group relative flex items-center gap-2 rounded-full bg-stone-900 px-3 text-sm text-yellow-400"
          >
            <Calendar className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          </button>
        )}
        <button
          onClick={() => {
            setIsNudgeHidden(true);
          }}
          className="group relative flex items-center gap-2 rounded-full bg-stone-900 px-3 text-sm text-yellow-400"
        >
          <X className="h-4 w-4 shrink-0" strokeWidth={2.5} />
        </button>
      </div>
    </>
  );
}
