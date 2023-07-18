import { getUrlParams } from '../lib/browser';
import { useEffect, useState } from 'preact/hooks';
import type { TeamDocument } from './CreateTeam/CreateTeamForm';
import type { TeamResourceConfig } from './CreateTeam/RoadmapSelector';
import { httpGet, httpPut } from '../lib/http';
import { pageProgressMessage } from '../stores/page';
import ExternalLink from '../icons/external-link.svg';
import type { PageType } from './CommandMenu/CommandMenu';
import { UpdateTeamResourceModal } from './CreateTeam/UpdateTeamResourceModal';

export function TeamRoadmaps() {
  const { t: teamId } = getUrlParams();

  const [error, setError] = useState('');
  const [changingRoadmapId, setChangingRoadmapId] = useState<string>('');
  const [team, setTeam] = useState<TeamDocument>();
  const [resourceConfigs, setResourceConfigs] = useState<TeamResourceConfig>(
    []
  );
  const [allRoadmaps, setAllRoadmaps] = useState<PageType[]>([]);

  async function loadAllRoadmaps() {
    const { error, response } = await httpGet<PageType[]>(`/pages.json`);

    if (error) {
      setError(error.message || 'Something went wrong. Please try again!');
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
      alert('Error loading team');
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
      setError(error?.message || 'Error deleting roadmap');
      return;
    }

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
    <div className={'grid grid-cols-2 gap-2'}>
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
            <div className={'w-full px-3 pb-2 pt-4'}>
              <a
                href={`/${resourceId}?t=${teamId}`}
                className="group mb-0.5 flex items-center justify-between text-base font-medium leading-none text-black"
                target={'_blank'}
              >
                {roadmapTitle}

                <img
                  alt={'link'}
                  src={ExternalLink}
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

            <div className={'flex w-full justify-between p-3'}>
              <button
                type="button"
                className={
                  'text-xs text-gray-500 underline hover:text-black focus:outline-none'
                }
                onClick={() => setChangingRoadmapId(resourceId)}
              >
                Make Changes
              </button>

              <button
                type="button"
                className={
                  'text-xs text-red-500 underline hover:text-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-red-500'
                }
                disabled={resourceConfigs.length === 1}
                onClick={() => onRemove(resourceId)}
                title={
                  resourceConfigs.length === 1
                    ? 'You must have at least one roadmap.'
                    : 'Delete roadmap from team'
                }
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
