import { useStore } from '@nanostores/preact';
import { RoadmapProgress, roadmapProgress } from '../../stores/roadmap';
import { useEffect, useState } from 'preact/hooks';
import { ResourceClearProgress } from '../Activity/ResourceClearProgress';
import {
  clearResourceProgress,
  getResourceProgress,
  renderResourceProgress,
} from '../../lib/resource-progress';

type RoadmapHintProgressProps = {
  roadmapId: string;
};

export function RoadmapHintProgress({ roadmapId }: { roadmapId: string }) {
  const [containerOpacity, setContainerOpacity] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState<RoadmapProgress>();
  const $progress = useStore(roadmapProgress);
  const roadmapKey = `roadmap-${roadmapId}-progress`;

  function showProgressContainer() {
    const heroEl = document.getElementById('roadmap-hint')!;
    if (!heroEl) {
      return;
    }

    heroEl.classList.add('opacity-0');
    setTimeout(() => {
      heroEl.parentElement?.removeChild(heroEl);

      setTimeout(() => {
        setContainerOpacity(100);
        setShowProgressBar(true);
      }, 50);
    }, 0);
  }

  useEffect(() => {
    if ($progress[roadmapKey] === undefined) {
      return;
    }

    setProgress($progress[roadmapKey]);
    showProgressContainer();
  }, [$progress]);

  if (!progress) {
    return null;
  }

  const {
    done: doneCount,
    learning: learningCount,
    skipped: skippedCount,
    total: totalCount,
  } = progress;

  const progressBarWidth = Math.round((progress.done / progress.total) * 100);

  return (
    <>
      <div
        className={`relative z-10 w-full transition-opacity duration-500 opacity-${containerOpacity}`}
      >
        <div className="flex w-full items-center justify-between text-sm text-gray-500">
          <div>
            <span className="hidden flex-1 gap-1 sm:flex">
              {doneCount > 0 && (
                <>
                  <span>{doneCount} done</span> &bull;
                </>
              )}
              {learningCount > 0 && (
                <>
                  <span>{learningCount} in progress</span> &bull;
                </>
              )}
              {skippedCount > 0 && (
                <>
                  <span>{skippedCount} skipped</span> &bull;
                </>
              )}
              <span>{totalCount} total</span>
            </span>
          </div>
          <ResourceClearProgress
            {...{
              resourceType: 'roadmap',
              resourceId: roadmapId,
              onCleared: async () => {
                clearResourceProgress('roadmap', roadmapId);
              },
            }}
          />
        </div>
      </div>

      <div
        className="absolute inset-0 w-0 bg-gray-100 transition-[opacity_width] duration-500"
        style={{
          width: `${showProgressBar && progressBarWidth}%`,
          opacity: containerOpacity,
        }}
      />
    </>
  );
}
