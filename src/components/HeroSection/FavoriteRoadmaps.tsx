import { useEffect, useState } from 'react';
import { EmptyProgress } from './EmptyProgress';
import { httpGet } from '../../lib/http';
import { HeroRoadmaps, type HeroTeamRoadmaps } from './HeroRoadmaps';
import { isLoggedIn } from '../../lib/jwt';
import type { AllowedMemberRoles } from '../ShareOptions/ShareTeamMemberList.tsx';

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
  isCustomResource: boolean;
  roadmapSlug?: string;
  team?: {
    name: string;
    id: string;
    role: AllowedMemberRoles;
  };
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
      }),
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

type ProgressResponse = UserProgressResponse;

export function FavoriteRoadmaps() {
  const isAuthenticated = isLoggedIn();
  if (!isAuthenticated) {
    return null;
  }

  const [isPreparing, setIsPreparing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<ProgressResponse>([]);
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

    const { response: progressList, error } = await httpGet<ProgressResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-hero-roadmaps`,
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

  const hasProgress = progress?.length > 0;
  const customRoadmaps = progress?.filter(
    (p) => p.isCustomResource && !p.team?.name,
  );
  const defaultRoadmaps = progress?.filter((p) => !p.isCustomResource);
  const teamRoadmaps: HeroTeamRoadmaps = progress
    ?.filter((p) => p.isCustomResource && p.team?.name)
    .reduce((acc: HeroTeamRoadmaps, curr) => {
      const currTeam = curr.team!;
      if (!acc[currTeam.name]) {
        acc[currTeam.name] = [];
      }

      acc[currTeam.name].push(curr);

      return acc;
    }, {});

  return (
    <div
      className={`transition-opacity duration-500  opacity-${containerOpacity}`}
    >
      <div
        className={`flex min-h-[192px] bg-linear-to-b sm:min-h-[280px] ${
          hasProgress && `border-t border-t-[#1e293c]`
        }`}
      >
        <div className="container min-h-full">
          {!isLoading && progress?.length == 0 && <EmptyProgress />}
          {hasProgress && (
            <HeroRoadmaps
              teamRoadmaps={teamRoadmaps}
              customRoadmaps={customRoadmaps}
              progress={defaultRoadmaps}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
