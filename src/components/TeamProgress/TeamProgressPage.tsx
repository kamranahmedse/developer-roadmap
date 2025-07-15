import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { useToast } from '../../hooks/use-toast';
import { getUrlParams, setUrlParams } from '../../lib/browser';
import { httpGet } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import { $currentTeam } from '../../stores/team';
import { GroupRoadmapItem } from './GroupRoadmapItem';
import { MemberCustomProgressModal } from './MemberCustomProgressModal';
import { MemberProgressItem } from './MemberProgressItem';
import { MemberProgressModal } from './MemberProgressModal';

export type UserProgress = {
  resourceTitle: string;
  resourceType: 'roadmap' | 'best-practice';
  resourceId: string;
  isFavorite: boolean;
  done: number;
  learning: number;
  skipped: number;
  total: number;
  updatedAt: string;
  isCustomResource?: boolean;
  roadmapSlug?: string;
  aiRoadmapId?: string;
};

export type TeamMember = {
  _id: string;
  role: string;
  name: string;
  email: string;
  avatar: string;
  progress: UserProgress[];
  updatedAt: string;
};

export type GroupByRoadmap = {
  resourceId: string;
  resourceTitle: string;
  resourceType: string;
  isCustomResource?: boolean;
  roadmapSlug?: string;
  members: {
    member: TeamMember;
    progress: UserProgress | undefined;
  }[];
};

const groupingTypes = [
  { label: 'Members', value: 'member' },
  { label: 'Roadmaps', value: 'roadmap' },
] as const;

export function TeamProgressPage() {
  const { t: teamId, gb: groupBy } = getUrlParams();

  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const currentTeam = useStore($currentTeam);
  const user = useAuth();

  const [showMemberProgress, setShowMemberProgress] = useState<{
    resourceId: string;
    member: TeamMember;
    isCustomResource?: boolean;
  }>();

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedGrouping, setSelectedGrouping] = useState<
    'roadmap' | 'member'
  >(groupBy || 'member');

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
        if (a.email === user?.email) {
          return -1;
        }
        if (b.email === user?.email) {
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

    getTeamProgress().then(() => {
      pageProgressMessage.set('');
      setIsLoading(false);
    });
  }, [teamId]);

  useEffect(() => {
    if (!selectedGrouping) {
      return;
    }

    setUrlParams({ gb: selectedGrouping });
  }, [selectedGrouping]);

  const groupByRoadmap: GroupByRoadmap[] = [];
  for (const roadmap of currentTeam?.roadmaps || []) {
    let isCustomResource = false;
    const members: GroupByRoadmap['members'] = [];
    for (const member of teamMembers) {
      const progress = member.progress.find(
        (progress) => progress.resourceId === roadmap,
      );
      if (!progress) {
        continue;
      }
      if (progress.isCustomResource && !isCustomResource) {
        isCustomResource = true;
      }

      members.push({
        member,
        progress,
      });
    }

    if (!members.length) {
      continue;
    }

    groupByRoadmap.push({
      resourceId: roadmap,
      resourceTitle: members?.[0].progress?.resourceTitle || '',
      resourceType: 'roadmap',
      roadmapSlug: members?.[0].progress?.roadmapSlug,
      members,
      isCustomResource,
    });
  }

  if (!teamId) {
    window.location.href = '/';
    return;
  }

  if (isLoading) {
    return null;
  }

  const ProgressModal =
    showMemberProgress && !showMemberProgress.isCustomResource
      ? MemberProgressModal
      : MemberCustomProgressModal;

  return (
    <div>
      {showMemberProgress && (
        <ProgressModal
          member={showMemberProgress.member}
          teamId={teamId}
          resourceId={showMemberProgress.resourceId}
          resourceType={'roadmap'}
          isCustomResource={showMemberProgress.isCustomResource}
          onClose={() => {
            setShowMemberProgress(undefined);
          }}
          onShowMyProgress={() => {
            setShowMemberProgress({
              resourceId: showMemberProgress.resourceId,
              member: teamMembers.find(
                (member) => member.email === user?.email,
              )!,
              isCustomResource: showMemberProgress.isCustomResource,
            });
          }}
        />
      )}

      <div className="flex items-center gap-2">
        {groupingTypes.map((grouping) => (
          <button
            key={grouping.value}
            className={`rounded-md border p-1 px-2 text-sm ${
              selectedGrouping === grouping.value
                ? 'border-gray-400 bg-gray-200'
                : ''
            }`}
            onClick={() => setSelectedGrouping(grouping.value)}
          >
            {grouping.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {selectedGrouping === 'roadmap' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {groupByRoadmap.map((roadmap) => {
              return (
                <GroupRoadmapItem
                  key={roadmap.resourceId}
                  roadmap={roadmap}
                  onShowResourceProgress={(member, resourceId) => {
                    setShowMemberProgress({
                      resourceId,
                      member,
                      isCustomResource: roadmap.isCustomResource,
                    });
                  }}
                />
              );
            })}
          </div>
        )}
        {selectedGrouping === 'member' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {teamMembers.map((member) => {
              const canViewMemberProgress =
                currentTeam?.role !== 'member' ||
                !currentTeam?.personalProgressOnly ||
                member.email === user?.email;

              if (!canViewMemberProgress) {
                return null;
              }

              return (
                <MemberProgressItem
                  key={member._id}
                  member={member}
                  teamId={teamId}
                  isMyProgress={member?.email === user?.email}
                  onShowResourceProgress={(resourceId, isCustomResource) => {
                    setShowMemberProgress({
                      resourceId,
                      member,
                      isCustomResource,
                    });
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
