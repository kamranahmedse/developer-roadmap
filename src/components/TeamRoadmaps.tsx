import { getUrlParams } from '../lib/browser';
import { useEffect, useState } from 'preact/hooks';
import type { TeamDocument } from './CreateTeam/CreateTeamForm';
import type { TeamResourceConfig } from './CreateTeam/RoadmapSelector';
import { httpGet, httpPut } from '../lib/http';
import { pageProgressMessage } from '../stores/page';
import ExternalLinkIcon from '../icons/external-link.svg';
import PlusIcon from '../icons/plus.svg';
import type { PageType } from './CommandMenu/CommandMenu';
import { UpdateTeamResourceModal } from './CreateTeam/UpdateTeamResourceModal';
import { AddTeamRoadmap } from './AddTeamRoadmap';
import { useStore } from '@nanostores/preact';
import { $canManageCurrentTeam } from '../stores/team';
import {useToast} from "../hooks/use-toast";

export function TeamRoadmaps() {
  const { t: teamId } = getUrlParams();

  const canManageCurrentTeam = useStore($canManageCurrentTeam);

  const toast = useToast();

  const [removingRoadmapId, setRemovingRoadmapId] = useState<string>('');
  const [isAddingRoadmap, setIsAddingRoadmap] = useState(false);
  const [changingRoadmapId, setChangingRoadmapId] = useState<string>('');
  const [team, setTeam] = useState<TeamDocument>();
  const [resourceConfigs, setResourceConfigs] = useState<TeamResourceConfig>(
    []
  );
  const [allRoadmaps, setAllRoadmaps] = useState<PageType[]>([]);

  async function loadAllRoadmaps() {
    const { error, response } = await httpGet<PageType[]>(`/pages.json`);

    if (error) {
      toast.error(error.message || 'Something went wrong');
      return;
    }

    if (!response) {
      return [];
    }

    const allRoadmaps = response
      .filter((page) => page.group === 'Roadmaps')
      .sort((a, b) => {
        if (a.title === 'Android') return 1;
        return a.title.localeCompare(b.title);
      });

    setAllRoadmaps(allRoadmaps);
    return response;
  }

  async function loadTeam(teamIdToFetch: string) {
    const { response, error } = await httpGet<TeamDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team/${teamIdToFetch}`
    );

    if (error || !response) {
      toast.error('Error loading team');
      window.location.href = '/account';
      return;
    }

    setTeam(response);
  }

  async function loadTeamResourceConfig(teamId: string) {
    const { error, response } = await httpGet<TeamResourceConfig>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-resource-config/${teamId}`
    );
    if (error || !Array.isArray(response)) {
      console.error(error);
      return;
    }

    setResourceConfigs(response);
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }

    Promise.all([
      loadTeam(teamId),
      loadTeamResourceConfig(teamId),
      loadAllRoadmaps(),
    ]).finally(() => {
      pageProgressMessage.set('');
    });
  }, [teamId]);

  async function deleteResource(roadmapId: string) {
    if (!team?._id) {
      return;
    }

    pageProgressMessage.set(`Deleting roadmap from team`);
    const { error, response } = await httpPut<TeamResourceConfig>(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-team-resource-config/${
        team._id
      }`,
      {
        resourceId: roadmapId,
        resourceType: 'roadmap',
      }
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    toast.success('Roadmap removed');
    setResourceConfigs(response);
  }

  async function onRemove(resourceId: string) {
    pageProgressMessage.set('Removing roadmap');

    deleteResource(resourceId).finally(() => {
      pageProgressMessage.set('');
    });
  }

  if (!team) {
    return null;
  }

  return (
    <div>
      {isAddingRoadmap && (
        <AddTeamRoadmap
          onMakeChanges={(roadmapId) => {
            setChangingRoadmapId(roadmapId);
            setIsAddingRoadmap(false);
          }}
          teamId={team?._id!}
          setResourceConfigs={setResourceConfigs}
          allRoadmaps={allRoadmaps}
          availableRoadmaps={allRoadmaps.filter((r) => {
            const isAlreadyAdded = resourceConfigs.find(
              (c) => c.resourceId === r.id
            );
            return !isAlreadyAdded;
          })}
          onClose={() => setIsAddingRoadmap(false)}
        />
      )}
      <div className={'grid grid-cols-1 gap-3 sm:grid-cols-2'}>
        {changingRoadmapId && (
          <UpdateTeamResourceModal
            onClose={() => setChangingRoadmapId('')}
            resourceId={changingRoadmapId}
            resourceType={'roadmap'}
            teamId={team?._id!}
            setTeamResourceConfig={setResourceConfigs}
            defaultRemovedItems={
              resourceConfigs.find((c) => c.resourceId === changingRoadmapId)
                ?.removed || []
            }
          />
        )}

        {resourceConfigs.map((resourceConfig) => {
          const { resourceId, removed: removedTopics } = resourceConfig;
          const roadmapTitle =
            allRoadmaps.find((roadmap) => roadmap.id === resourceId)?.title ||
            '...';

          return (
            <div className="flex flex-col items-start rounded-md border border-gray-300">
              <div className={'w-full px-3 py-4'}>
                <a
                  href={`/${resourceId}?t=${teamId}`}
                  className="group mb-0.5 flex items-center justify-between text-base font-medium leading-none text-black"
                  target={'_blank'}
                >
                  {roadmapTitle}

                  <img
                    alt={'link'}
                    src={ExternalLinkIcon}
                    className="ml-2 h-4 w-4 opacity-20 transition-opacity group-hover:opacity-100"
                  />
                </a>
                {removedTopics.length > 0 ? (
                  <span className={'text-xs leading-none text-gray-900'}>
                    {removedTopics.length} topic
                    {removedTopics.length > 1 ? 's' : ''} removed
                  </span>
                ) : (
                  <span className="text-xs italic leading-none text-gray-400/60">
                    No changes made ..
                  </span>
                )}
              </div>

              { canManageCurrentTeam && (
                <div className={'flex w-full justify-between pt-2 pb-3 px-3'}>
                  <button
                    type="button"
                    className={
                      'text-xs text-gray-500 underline hover:text-black focus:outline-none'
                    }
                    onClick={() => {
                      setRemovingRoadmapId('');
                      setChangingRoadmapId(resourceId);
                    }}
                  >
                    Customize
                  </button>

                  {removingRoadmapId !== resourceId && (
                    <button
                      type="button"
                      className={
                        'text-xs text-red-500 underline hover:text-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-red-500'
                      }
                      disabled={resourceConfigs.length === 1}
                      onClick={() => setRemovingRoadmapId(resourceId)}
                      title={
                        resourceConfigs.length === 1
                          ? 'You must have at least one roadmap.'
                          : 'Delete roadmap from team'
                      }
                    >
                      Remove
                    </button>
                  )}

                  {removingRoadmapId === resourceId && (
                    <span className="text-xs">
                      Are you sure?{' '}
                      <button
                        onClick={() => onRemove(resourceId)}
                        className="mx-0.5 text-red-500 underline underline-offset-1"
                      >
                        Yes
                      </button>{' '}
                      <button
                        onClick={() => setRemovingRoadmapId('')}
                        className="text-red-500 underline underline-offset-1"
                      >
                        No
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {canManageCurrentTeam && (
          <button
            onClick={() => setIsAddingRoadmap(true)}
            className="group flex min-h-[110px] flex-col items-center justify-center rounded-md border border-dashed border-gray-300 transition-colors hover:border-gray-600 hover:bg-gray-50"
          >
            <img
              alt="add"
              src={PlusIcon}
              className="mb-1 h-6 w-6 opacity-20 transition-opacity group-hover:opacity-100"
            />
            <span className="text-sm text-gray-400 transition-colors focus:outline-none group-hover:text-black">
              Add Roadmap
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
