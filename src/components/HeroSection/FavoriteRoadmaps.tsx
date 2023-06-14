import { useEffect, useState } from 'preact/hooks';
import { EmptyProgress } from './EmptyProgress';
import { httpGet } from '../../lib/http';
import { ProgressList } from './ProgressList';

export type UserProgressResponse = {
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  resourceTitle: string;
  done: number;
  learning: number;
  skipped: number;
  total: number;
  updatedAt: Date;
}[];

function renderProgress(progressList: UserProgressResponse) {
  progressList.forEach((progress) => {
    const href =
      progress.resourceType === 'best-practice'
        ? `/best-practices/${progress.resourceId}`
        : `/${progress.resourceId}`;
    const element = document.querySelector(`a[href="${href}"]`);
    if (!element) {
      return;
    }

    const totalDone = progress.done + progress.skipped;
    const percentageDone = (totalDone / progress.total) * 100;

    const progressBar: HTMLElement | null =
      element.querySelector('[data-progress]');
    if (progressBar) {
      progressBar.style.width = `${percentageDone}%`;
    }
  });
}

export function FavoriteRoadmaps() {
  const [isPreparing, setIsPreparing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<UserProgressResponse>([]);
  const [containerOpacity, setContainerOpacity] = useState(0);

  function showProgressContainer() {
    const heroEl = document.getElementById('hero-text')!;
    if (!heroEl) {
      return;
    }

    heroEl.classList.add('opacity-0');
    setTimeout(() => {
      heroEl.parentElement?.removeChild(heroEl);
      setIsPreparing(false);

      setTimeout(() => {
        setContainerOpacity(100);
      }, 50);
    }, 300);
  }

  async function loadProgress() {
    setIsLoading(true);
    const { response: progressList, error } =
      await httpGet<UserProgressResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-get-user-all-progress`
      );

    if (error || !progressList) {
      return;
    }

    setProgress(progressList);
    renderProgress(progressList);
  }

  useEffect(() => {
    showProgressContainer();
    loadProgress().finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isPreparing) {
    return null;
  }

  const hasProgress = progress.length > 0;

  return (
    <div
      class={`flex min-h-[192px] bg-gradient-to-b transition-opacity duration-500 sm:min-h-[280px] opacity-${containerOpacity} ${
        hasProgress && `border-t border-t-[#1e293c]`
      }`}
    >
      <div className="container min-h-full">
        {!isLoading && progress.length == 0 && <EmptyProgress />}
        {isLoading && <EmptyProgress title="Loading progress .." />}
        {!isLoading && progress.length > 0 && (
          <ProgressList progress={progress} />
        )}
      </div>
    </div>
  );
}
