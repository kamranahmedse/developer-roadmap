import { useEffect, useState } from 'react';
import type { TeamMember } from '../TeamProgress/TeamProgressPage';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { getUser } from '../../lib/jwt';
import { LoadingProgress } from './LoadingProgress';
import { ResourceProgress } from '../Activity/ResourceProgress';
import { Plus, Minus } from 'lucide-react';
import { TeamActivityPage } from '../TeamActivity/TeamActivityPage';
import { cn } from '../../lib/classname';

type TeamDashboardProps = {
  teamId: string;
};

export function TeamDashboard(props: TeamDashboardProps) {
  const { teamId } = props;

  const toast = useToast();
  const currentUser = getUser();

  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showAllMembers, setShowAllMembers] = useState(false);

  async function getTeamProgress() {
    const { response, error } = await httpGet<TeamMember[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-progress/${teamId}`,
    );
    if (error || !response) {
      toast.error(error?.message || 'Failed to get team progress');
      return;
    }

    setTeamMembers(
      response.sort((a, b) => {
        if (a.email === currentUser?.email) {
          return -1;
        }
        if (b.email === currentUser?.email) {
          return 1;
        }
        return 0;
      }),
    );
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }

    getTeamProgress().finally(() => setIsLoading(false));
  }, [teamId]);

  if (!currentUser) {
    return null;
  }

  const currentMember = teamMembers.find(
    (member) => member.email === currentUser.email,
  );
  const learningRoadmapsToShow =
    currentMember?.progress?.filter(
      (progress) => progress.resourceType === 'roadmap',
    ) || [];

  const allMembersWithoutCurrentUser = teamMembers
    .sort((a, b) => {
      if (a.email === currentUser.email) {
        return -1;
      }

      if (b.email === currentUser.email) {
        return 1;
      }

      return 0;
    })
    .slice(0, showAllMembers ? teamMembers.length : 15);

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xs uppercase text-gray-400">Roadmaps</h2>
      {isLoading && <LoadingProgress />}
      {!isLoading && learningRoadmapsToShow.length > 0 && (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
          {learningRoadmapsToShow.map((roadmap) => {
            const learningCount = roadmap.learning || 0;
            const doneCount = roadmap.done || 0;
            const totalCount = roadmap.total || 0;
            const skippedCount = roadmap.skipped || 0;

            return (
              <ResourceProgress
                key={roadmap.resourceId}
                isCustomResource={roadmap?.isCustomResource || false}
                doneCount={doneCount > totalCount ? totalCount : doneCount}
                learningCount={
                  learningCount > totalCount ? totalCount : learningCount
                }
                totalCount={totalCount}
                skippedCount={skippedCount}
                resourceId={roadmap.resourceId}
                resourceType="roadmap"
                updatedAt={roadmap.updatedAt}
                title={roadmap.resourceTitle}
                showActions={false}
                roadmapSlug={roadmap.roadmapSlug}
              />
            );
          })}
        </div>
      )}

      <h2 className="mb-3 mt-6 text-xs uppercase text-gray-400">
        Team Members
      </h2>
      {isLoading && <TeamMemberLoading className="mb-6" />}
      {!isLoading && (
        <div className="mb-6 flex flex-wrap gap-2">
          {allMembersWithoutCurrentUser.map((member) => {
            const avatar = member?.avatar
              ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${member.avatar}`
              : '/images/default-avatar.png';
            return (
              <figure
                key={member.email}
                className="relative aspect-square size-8 overflow-hidden rounded-md bg-gray-100"
              >
                <img
                  src={avatar}
                  alt={member.name || ''}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <figcaption className="sr-only">{member.name}</figcaption>
              </figure>
            );
          })}
          {teamMembers.length > 0 && (
            <button
              onClick={() => setShowAllMembers((prev) => !prev)}
              className="flex aspect-square size-8 items-center justify-center rounded-md bg-gray-200 text-gray-600 hover:text-black"
            >
              {showAllMembers ? (
                <Minus className="size-5" />
              ) : (
                <Plus className="size-5" />
              )}
            </button>
          )}
        </div>
      )}

      <TeamActivityPage teamId={teamId} />
    </section>
  );
}

type TeamMemberLoadingProps = {
  className?: string;
};

function TeamMemberLoading(props: TeamMemberLoadingProps) {
  const { className } = props;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="size-8 animate-pulse rounded-md bg-gray-200"
        ></div>
      ))}
    </div>
  );
}
