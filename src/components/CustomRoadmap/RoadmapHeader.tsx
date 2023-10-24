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
import { Lock, Shapes } from 'lucide-react';
import { Modal } from '../Modal';
import { ShareSuccess } from '../ShareOptions/ShareSuccess';

type RoadmapHeaderProps = {};

export function RoadmapHeader(props: RoadmapHeaderProps) {
  const $canManageCurrentRoadmap = useStore(canManageCurrentRoadmap);
  const $currentRoadmap = useStore(currentRoadmap);

  const {
    title,
    description,
    _id: roadmapId,
    creator,
    team,
    visibility,
  } = useStore(currentRoadmap) || {};

  const [isSharing, setIsSharing] = useState(false);
  const [isSharingWithOthers, setIsSharingWithOthers] = useState(false);
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
        }
      ));
    } else {
      ({ error, response } = await httpDelete<TeamResourceConfig>(
        `${baseApiUrl}/v1-delete-roadmap/${roadmapId}`
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

  const sharingWithOthersModal = isSharingWithOthers && (
    <Modal
      onClose={() => setIsSharingWithOthers(false)}
      wrapperClassName="max-w-lg"
      bodyClassName="p-4 flex flex-col"
    >
      <ShareSuccess
        visibility="public"
        roadmapId={roadmapId!}
        description={description}
        onClose={() => setIsSharingWithOthers(false)}
        isSharingWithOthers={true}
      />
    </Modal>
  );

  return (
    <div className="border-b">
      <div className="container relative py-5 sm:py-12">
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
          <div className="flex gap-1 sm:gap-2">
            <a
              href="/roadmaps"
              className="rounded-md bg-gray-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-600 sm:text-sm"
              aria-label="Back to All Roadmaps"
            >
              &larr;<span className="hidden sm:inline">&nbsp;All Roadmaps</span>
            </a>

            <button
              data-guest-required
              data-popup="login-popup"
              className="inline-flex hidden items-center justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-medium hover:bg-yellow-500 sm:text-sm"
              aria-label="Subscribe for Updates"
            >
              <span className="ml-2">Subscribe</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            {$canManageCurrentRoadmap && (
              <>
                {isSharing && $currentRoadmap && (
                  <ShareOptionsModal
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

                <a
                  href={`${import.meta.env.PUBLIC_EDITOR_APP_URL}/${
                    $currentRoadmap?._id
                  }`}
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white py-1.5 pl-2 pr-2 text-xs font-medium  text-black hover:border-gray-300 hover:bg-gray-300 sm:px-3 sm:text-sm"
                >
                  <Shapes className="mr-1.5 h-4 w-4 stroke-[2.5]" />
                  <span className="hidden sm:inline-block">Edit Roadmap</span>
                  <span className="sm:hidden">Edit</span>
                </a>
                <button
                  onClick={() => setIsSharing(true)}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white py-1.5 pl-2 pr-2 text-xs font-medium text-black hover:border-gray-300 hover:bg-gray-300 sm:px-3 sm:text-sm"
                >
                  <Lock className="mr-1.5 h-4 w-4 stroke-[2.5]" />
                  Sharing
                </button>

                <RoadmapActionButton
                  onDelete={() => {
                    const confirmation = window.confirm(
                      'Are you sure you want to delete this roadmap?'
                    );

                    if (!confirmation) {
                      return;
                    }

                    deleteResource().finally(() => null);
                  }}
                />
              </>
            )}

            {!$canManageCurrentRoadmap && visibility === 'public' && (
              <>
                {sharingWithOthersModal}
                <button
                  onClick={() => setIsSharingWithOthers(true)}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white py-1.5 pl-2 pr-2 text-xs font-medium  text-black hover:border-gray-300 hover:bg-gray-300 sm:px-3 sm:text-sm"
                >
                  <Lock className="mr-1.5 h-4 w-4 stroke-[2.5]" />
                  Share with Others
                </button>
              </>
            )}
          </div>
        </div>

        <RoadmapHint
          roadmapTitle={title!}
          hasTNSBanner={false}
          roadmapId={roadmapId!}
        />
      </div>
    </div>
  );
}
