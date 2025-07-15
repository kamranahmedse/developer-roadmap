import { RoadmapHint } from './RoadmapHint';
import { useStore } from '@nanostores/react';
import { canManageCurrentRoadmap, currentRoadmap } from '../../stores/roadmap';
import { ShareOptionsModal } from '../ShareOptions/ShareOptionsModal';
import { useState } from 'react';
import { pageProgressMessage } from '../../stores/page';
import { httpDelete, httpPut } from '../../lib/http';
import { type TeamResourceConfig } from '../CreateTeam/RoadmapSelector';
import { useToast } from '../../hooks/use-toast';
import { RoadmapActionButton } from './RoadmapActionButton';
import { ShareRoadmapButton } from '../ShareRoadmapButton.tsx';
import { CustomRoadmapAlert } from './CustomRoadmapAlert.tsx';
import { CustomRoadmapRatings } from './CustomRoadmapRatings.tsx';
import { ShowcaseStatus } from './Showcase/ShowcaseStatus.tsx';
import { ShowcaseAlert } from './Showcase/ShowcaseAlert.tsx';

type RoadmapHeaderProps = {};

export function RoadmapHeader(props: RoadmapHeaderProps) {
  const $canManageCurrentRoadmap = useStore(canManageCurrentRoadmap);
  const $currentRoadmap = useStore(currentRoadmap);

  const {
    title,
    description,
    _id: roadmapId,
    slug: roadmapSlug,
    creator,
    team,
    visibility,
    ratings,
    unseenRatingCount,
    showcaseStatus,
  } = useStore(currentRoadmap) || {};

  const [isSharing, setIsSharing] = useState(false);
  const toast = useToast();

  async function deleteResource() {
    pageProgressMessage.set('Deleting roadmap');

    const teamId = $currentRoadmap?.teamId;
    const baseApiUrl = import.meta.env.PUBLIC_API_URL;

    let error, response;
    if (teamId) {
      ({ error, response } = await httpPut<TeamResourceConfig>(
        `${baseApiUrl}/v1-delete-team-resource-config/${teamId}`,
        {
          resourceId: roadmapId,
          resourceType: 'roadmap',
        },
      ));
    } else {
      ({ error, response } = await httpDelete<TeamResourceConfig>(
        `${baseApiUrl}/v1-delete-roadmap/${roadmapId}`,
      ));
    }

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    toast.success('Roadmap removed');
    if (!teamId) {
      window.location.href = '/account/roadmaps';
    } else {
      window.location.href = `/team/roadmaps?t=${teamId}`;
    }
  }

  const avatarUrl = creator?.avatar
    ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${creator?.avatar}`
    : '/images/default-avatar.png';

  return (
    <>
      <div className="relative border-b">
        {$currentRoadmap && $canManageCurrentRoadmap && (
          <ShowcaseAlert currentRoadmap={$currentRoadmap} />
        )}

        <div className="container relative py-5 sm:py-12">
          {!$canManageCurrentRoadmap && <CustomRoadmapAlert />}

          {creator?.name && (
            <div className="-mb-1 flex items-center gap-1.5 text-sm text-gray-500">
              <img
                alt={creator.name}
                src={avatarUrl}
                className="h-5 w-5 rounded-full"
              />
              <span>
                Created by&nbsp;
                <span className="font-semibold text-gray-900">
                  {creator?.name}
                </span>
                {team && (
                  <>
                    &nbsp;from&nbsp;
                    <span className="font-semibold text-gray-900">
                      {team?.name}
                    </span>
                  </>
                )}
              </span>
            </div>
          )}
          <div className="mb-3 mt-4 sm:mb-4">
            <h1 className="text-2xl font-bold sm:mb-2 sm:text-4xl">{title}</h1>
            <p className="mt-0.5 text-sm text-gray-500 sm:text-lg">
              {description}
            </p>
          </div>

          <div className="flex justify-between gap-2 sm:gap-0">
            <div className="flex justify-stretch gap-1 sm:gap-2">
              <a
                href="/community"
                className="rounded-md bg-gray-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-600 sm:text-sm"
                aria-label="Back to All Roadmaps"
              >
                &larr;
                <span className="hidden sm:inline">&nbsp;Discover more</span>
              </a>

              <ShareRoadmapButton
                roadmapId={roadmapId!}
                description={description!}
                pageUrl={`https://roadmap.sh/r/${roadmapSlug}`}
                allowEmbed={true}
              />
            </div>
            <div className="flex items-center gap-2">
              {$canManageCurrentRoadmap && (
                <>
                  {isSharing && $currentRoadmap && (
                    <ShareOptionsModal
                      roadmapSlug={$currentRoadmap?.slug}
                      isDiscoverable={$currentRoadmap.isDiscoverable}
                      description={$currentRoadmap?.description}
                      visibility={$currentRoadmap?.visibility}
                      teamId={$currentRoadmap?.teamId}
                      roadmapId={$currentRoadmap?._id!}
                      sharedFriendIds={$currentRoadmap?.sharedFriendIds || []}
                      sharedTeamMemberIds={
                        $currentRoadmap?.sharedTeamMemberIds || []
                      }
                      onClose={() => setIsSharing(false)}
                      onShareSettingsUpdate={(settings) => {
                        currentRoadmap.set({
                          ...$currentRoadmap,
                          ...settings,
                        });
                      }}
                    />
                  )}

                  {$currentRoadmap && (
                    <ShowcaseStatus currentRoadmap={$currentRoadmap} />
                  )}

                  <RoadmapActionButton
                    onUpdateSharing={() => setIsSharing(true)}
                    onCustomize={() => {
                      window.location.href = `${
                        import.meta.env.PUBLIC_EDITOR_APP_URL
                      }/${$currentRoadmap?._id}`;
                    }}
                    onDelete={() => {
                      const confirmation = window.confirm(
                        'Are you sure you want to delete this roadmap?',
                      );

                      if (!confirmation) {
                        return;
                      }

                      deleteResource().finally(() => null);
                    }}
                  />
                </>
              )}

              {showcaseStatus === 'approved' && (
                <CustomRoadmapRatings
                  roadmapSlug={roadmapSlug!}
                  ratings={ratings!}
                  canManage={$canManageCurrentRoadmap}
                  unseenRatingCount={unseenRatingCount || 0}
                />
              )}
            </div>
          </div>

          <RoadmapHint
            roadmapTitle={title!}
            roadmapId={roadmapId!}
          />
        </div>
      </div>
    </>
  );
}
