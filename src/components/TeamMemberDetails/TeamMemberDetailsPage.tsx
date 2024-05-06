import { useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import { getUrlParams } from '../../lib/browser';
import { useToast } from '../../hooks/use-toast';
import type { TeamMemberDocument } from '../TeamMembers/TeamMembersPage';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import type { TeamActivityStreamDocument } from '../TeamActivity/TeamActivityPage';
import { ResourceProgress } from '../Activity/ResourceProgress';
import { ActivityStream } from '../Activity/ActivityStream';
import { MemberRoleBadge } from '../TeamMembers/RoleBadge';
import { TeamMemberEmptyPage } from './TeamMemberEmptyPage';
import { Pagination } from '../Pagination/Pagination';

type GetTeamMemberProgressesResponse = TeamMemberDocument & {
  name: string;
  avatar: string;
  email: string;
  progresses: UserProgress[];
};

type GetTeamMemberActivityResponse = {
  data: TeamActivityStreamDocument[];
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

export function TeamMemberDetailsPage() {
  const { t: teamId, m: memberId } = getUrlParams() as { t: string; m: string };

  const toast = useToast();

  const [memberProgress, setMemberProgress] =
    useState<GetTeamMemberProgressesResponse | null>(null);
  const [memberActivity, setMemberActivity] =
    useState<GetTeamMemberActivityResponse | null>(null);
  const [currPage, setCurrPage] = useState(1);

  const loadMemberProgress = async () => {
    const { response, error } = await httpGet<GetTeamMemberProgressesResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-member-progresses/${teamId}/${memberId}`,
    );
    if (error || !response) {
      pageProgressMessage.set('');
      toast.error(error?.message || 'Failed to load team member');
      return;
    }

    setMemberProgress(response);
  };

  const loadMemberActivity = async (currPage: number = 1) => {
    const { response, error } = await httpGet<GetTeamMemberActivityResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-member-activity/${teamId}/${memberId}`,
      {
        currPage,
      },
    );
    if (error || !response) {
      pageProgressMessage.set('');
      toast.error(error?.message || 'Failed to load team member activity');
      return;
    }

    setMemberActivity(response);
    setCurrPage(response?.currPage || 1);
  };

  useEffect(() => {
    if (!teamId) {
      return;
    }

    Promise.allSettled([loadMemberProgress(), loadMemberActivity()]).finally(
      () => {
        pageProgressMessage.set('');
      },
    );
  }, [teamId]);

  if (!teamId || !memberId || !memberProgress || !memberActivity) {
    return null;
  }

  const avatarUrl = memberProgress?.avatar
    ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${memberProgress?.avatar}`
    : '/images/default-avatar.png';

  return (
    <>
      <div>
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={memberProgress?.name}
            className="h-24 w-24 rounded-full"
          />
          <div>
            <MemberRoleBadge
              className="sm:inline-flex"
              role={memberProgress?.role!}
            />
            <h1 className="mt-1 text-2xl font-medium">
              {memberProgress?.name}
            </h1>
            <p className="text-sm text-gray-500">{memberProgress?.email}</p>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-200" />

      {memberProgress?.progresses && memberProgress?.progresses?.length > 0 ? (
        <>
          <h2 className="mb-3 text-xs uppercase text-gray-400">
            Progress Overview
          </h2>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {memberProgress?.progresses?.map((progress) => {
              const learningCount = progress.learning || 0;
              const doneCount = progress.done || 0;
              const totalCount = progress.total || 0;
              const skippedCount = progress.skipped || 0;

              return (
                <ResourceProgress
                  key={progress.resourceId}
                  isCustomResource={progress.isCustomResource!}
                  doneCount={doneCount > totalCount ? totalCount : doneCount}
                  learningCount={
                    learningCount > totalCount ? totalCount : learningCount
                  }
                  totalCount={totalCount}
                  skippedCount={skippedCount}
                  resourceId={progress.resourceId}
                  resourceType={'roadmap'}
                  updatedAt={progress.updatedAt}
                  title={progress.resourceTitle}
                  roadmapSlug={progress.roadmapSlug}
                  showActions={false}
                />
              );
            })}
          </div>
        </>
      ) : (
        <TeamMemberEmptyPage teamId={teamId} />
      )}

      {memberActivity?.data && memberActivity?.data?.length > 0 ? (
        <>
          <ActivityStream
            className="mt-8 p-0 md:m-0 md:mb-4 md:mt-8 md:p-0"
            activities={
              memberActivity?.data?.flatMap((act) => act.activity) || []
            }
          />
          <Pagination
            currPage={currPage}
            totalPages={memberActivity?.totalPages || 1}
            totalCount={memberActivity?.totalCount || 0}
            perPage={memberActivity?.perPage || 10}
            onPageChange={(page) => {
              pageProgressMessage.set('Loading Activity');
              loadMemberActivity(page).finally(() => {
                pageProgressMessage.set('');
              });
            }}
          />
        </>
      ) : null}
    </>
  );
}
