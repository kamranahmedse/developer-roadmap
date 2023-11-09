import { Spinner } from '../ReactIcons/Spinner.tsx';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/classname.ts';
import { getUser } from '../../lib/jwt.ts';
import { roadmapProgress, totalRoadmapNodes } from '../../stores/roadmap.ts';
import { useStore } from '@nanostores/react';
import {HelpCircle} from "lucide-react";

type ProgressNudgeProps = {
  resourceType: 'roadmap' | 'best-practice';
  resourceId: string;
};

export function ProgressNudge(props: ProgressNudgeProps) {
  const { resourceId, resourceType } = props;

  const $totalRoadmapNodes = useStore(totalRoadmapNodes);
  const $roadmapProgress = useStore(roadmapProgress);

  const done = $roadmapProgress?.done?.length || 0;

  const [isLoading, setIsLoading] = useState(true);
  const { id: userId } = getUser() || {};

  const hasProgress = done > 0;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (!$totalRoadmapNodes) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed hidden sm:block -bottom-full left-1/2 z-30 -translate-x-1/2 transform overflow-hidden rounded-full bg-stone-900 px-4 py-2 text-center text-white shadow-2xl transition-all ',
        {
          'bottom-5 opacity-100': !isLoading,
        },
      )}
    >
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
    </div>
  );
}
