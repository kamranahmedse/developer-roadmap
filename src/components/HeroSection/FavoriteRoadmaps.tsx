import { useEffect, useState } from 'react';
import { EmptyProgress } from './EmptyProgress';
import { httpGet } from '../../lib/http';
import { HeroRoadmaps } from './HeroRoadmaps';
import {isLoggedIn} from "../../lib/jwt";

export type UserProgressResponse = {
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  resourceTitle: string;
  isFavorite: boolean;
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

    window.dispatchEvent(
      new CustomEvent('mark-favorite', {
        detail: {
          resourceId: progress.resourceId,
          resourceType: progress.resourceType,
          isFavorite: progress.isFavorite,
        },
      })
    );

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
  const isAuthenticated = isLoggedIn();
  if (!isAuthenticated) {
    return null;
  }

  const [isPreparing, setIsPreparing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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
    }, 0);
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
    setIsLoading(false);
    showProgressContainer();

    // render progress on featured items
    renderProgress(progressList);
  }

  useEffect(() => {
    loadProgress().finally(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('refresh-favorites', loadProgress);
    return () => window.removeEventListener('refresh-favorites', loadProgress);
  }, []);

  if (isPreparing) {
    return null;
  }

  const hasProgress = progress.length > 0;

  return (
    <div
      className={`flex min-h-[192px] bg-gradient-to-b transition-opacity duration-500 sm:min-h-[280px] opacity-${containerOpacity} ${
        hasProgress && `border-t border-t-[#1e293c]`
      }`}
    >
      <div className="container min-h-full">
        {!isLoading && progress.length == 0 && <EmptyProgress />}
        {progress.length > 0 && (
          <HeroRoadmaps customRoadmaps={[]} progress={progress} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
