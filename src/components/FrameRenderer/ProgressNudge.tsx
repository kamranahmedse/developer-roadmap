import { cn } from '../../lib/classname.ts';
import { roadmapProgress, totalRoadmapNodes } from '../../stores/roadmap.ts';
import { useStore } from '@nanostores/react';
import { TipsIcon } from '../ReactIcons/TipsIcon.tsx'
import { CloseIcon } from '../ReactIcons/CloseIcon.tsx'

import { useState } from 'react';

type ProgressNudgeProps = {
  resourceType: 'roadmap' | 'best-practice';
  resourceId: string;
};

export function ProgressNudge(props: ProgressNudgeProps) {
  const $totalRoadmapNodes = useStore(totalRoadmapNodes);
  const $roadmapProgress = useStore(roadmapProgress);
  const [isHover, setHover] = useState(false)
  const [isHidden, setHidden] = useState(false)

  const done = $roadmapProgress?.done?.length || 0;

  const hasProgress = done > 0;
  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false)
  const onHiddenTips = () => setHidden(true)
  const onOpenTips = () => {
    setHidden(false)
    setHover(false)
  }

  if (!$totalRoadmapNodes) {
    return null;
  }

  return (
    <div
      className={
        cn('fixed bottom-5 left-1/2 z-30 hidden -translate-x-1/2 transform animate-fade-slide-up overflow-hidden rounded-[100px] bg-stone-900 px-4 py-2 text-center text-white shadow-2xl transition-all duration-300 sm:flex sm:items-center sm:gap-4',
          {
            "pr-8": isHover,
            "bottom-0 rounded-md cursor-pointer p-2 rounded-b-none hover:rounded-b-none": isHidden
          }
        )
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={isHidden ? onOpenTips : undefined}
    >
      {isHidden ? <TipsIcon className="text-yellow-400 w-4 h-4" /> :
        <>
          <span
            className={cn('block', {
              hidden: hasProgress,
            })}
          >
            <span className="mr-2 text-sm font-semibold uppercase text-yellow-400">
              Tip
            </span>
            <span className="text-sm text-gray-200">
              Right-click on a topic to mark it as done.{' '}
              <button
                data-popup="progress-help"
                className="cursor-pointer font-semibold text-yellow-500 underline"
              >
                Learn more.
              </button>
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
            <span>{done}</span> of <span>{$totalRoadmapNodes}</span> Done
          </span>

          <span
            className="absolute bottom-0 left-0 top-0 z-10 bg-stone-700"
            style={{
              width: `${(done / $totalRoadmapNodes) * 100}%`,
            }}
          ></span>
          {!isHidden && isHover && <CloseIcon className='text-yellow-400 w-4 h-4 absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer' onClick={onHiddenTips} />}
        </>}

    </div>
  );
}
