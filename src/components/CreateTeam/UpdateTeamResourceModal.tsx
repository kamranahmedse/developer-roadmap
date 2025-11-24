import { useEffect, useRef, useState } from 'react';
import { wireframeJSONToSVG } from 'roadmap-renderer';
import { Spinner } from '../ReactIcons/Spinner';
import { httpPut } from '../../lib/http';
import { renderTopicProgress } from '../../lib/resource-progress';
import '../FrameRenderer/FrameRenderer.css';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
import type { TeamResourceConfig } from './RoadmapSelector';
import { useToast } from '../../hooks/use-toast';
import {replaceChildren} from "../../lib/dom.ts";

export type ProgressMapProps = {
  teamId: string;
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  defaultRemovedItems?: string[];
  setTeamResourceConfig: (config: TeamResourceConfig) => void;
  onClose: () => void;
};

export function UpdateTeamResourceModal(props: ProgressMapProps) {
  const {
    defaultRemovedItems = [],
    resourceId,
    resourceType,
    teamId,
    setTeamResourceConfig,
    onClose,
  } = props;

  const containerEl = useRef<HTMLDivElement>(null);
  const popupBodyEl = useRef<HTMLDivElement>(null);

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [removedItems, setRemovedItems] =
    useState<string[]>(defaultRemovedItems);

  useEffect(() => {
    function onTopicClick(e: any) {
      const groupEl = e.target.closest('.clickable-group');
      const groupId = groupEl?.dataset?.groupId;

      if (!groupId) {
        return;
      }

      const normalizedGroupId = groupId.replace(/^\d+-/, '');
      if (removedItems.includes(normalizedGroupId)) {
        setRemovedItems((prev) =>
          prev.filter((id) => id !== normalizedGroupId)
        );
        renderTopicProgress(normalizedGroupId, 'reset' as any);
      } else {
        setRemovedItems((prev) => [...prev, normalizedGroupId]);
        renderTopicProgress(normalizedGroupId, 'removed');
      }
    }

    document.addEventListener('click', onTopicClick);
    return () => {
      document.removeEventListener('click', onTopicClick);
    };
  }, [removedItems]);

  let resourceJsonUrl = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://roadmap.sh';
  if (resourceType === 'roadmap') {
    resourceJsonUrl += `/${resourceId}.json`;
  } else {
    resourceJsonUrl += `/best-practices/${resourceId}.json`;
  }

  async function renderResource(jsonUrl: string) {
    const res = await fetch(jsonUrl);
    const json = await res.json();
    const svg = await wireframeJSONToSVG(json, {
      fontURL: '/fonts/balsamiq.woff2',
    });

    replaceChildren(containerEl.current!, svg);
    // containerEl.current?.replaceChildren(svg);

    // Render team configuration
    removedItems.forEach((topicId: string) => {
      renderTopicProgress(topicId, 'removed');
    });
  }

  useKeydown('Escape', () => {
    onClose();
  });

  useOutsideClick(popupBodyEl, () => {
    onClose();
  });

  async function onSaveChanges() {
    if (removedItems.length === 0) {
      return;
    }

    setIsUpdating(true);
    const { error, response } = await httpPut<TeamResourceConfig>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-update-team-resource-config/${teamId}`,
      {
        teamId: teamId,
        resourceId: resourceId,
        resourceType: resourceType,
        removed: removedItems,
      }
    );

    if (error || !response) {
      toast.error(error?.message || 'Error adding roadmap');
      return;
    }

    setTeamResourceConfig(response);
    onClose();
  }

  useEffect(() => {
    if (
      !containerEl.current ||
      !resourceJsonUrl ||
      !resourceId ||
      !resourceType ||
      !teamId
    ) {
      return;
    }

    renderResource(resourceJsonUrl)
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong. Please try again!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-100 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50">
      <div className="relative mx-auto h-full w-full max-w-4xl p-4 md:h-auto">
        <div
          id={'customized-roadmap'}
          ref={popupBodyEl}
          className="popup-body relative rounded-lg bg-white shadow-sm"
        >
          <div
            className={
              'sticky top-0 mb-3 rounded-2xl border-4 border-white bg-black p-4'
            }
          >
            <p className="mb-2 text-gray-300">
              Click and select the items to remove from the roadmap.
            </p>
            <div className="flex flex-row items-center gap-1.5">
              <button
                disabled={removedItems.length === 0}
                onClick={() =>
                  onSaveChanges().finally(() => setIsUpdating(false))
                }
                className={
                  'rounded-md bg-blue-600 px-2.5 py-1.5 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400'
                }
              >
                {isUpdating ? (
                  <span className={'flex items-center gap-1.5'}>
                    <Spinner
                      className="h-3 w-3"
                      innerFill="white"
                      isDualRing={false}
                    />{' '}
                    Saving ..
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button
                onClick={onClose}
                className="rounded-md bg-gray-600 px-2.5 py-1.5 text-sm text-white hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
          <div id="resource-svg-wrap" ref={containerEl} className="px-4"></div>

          {isLoading && (
            <div className="flex w-full justify-center">
              <Spinner
                isDualRing={false}
                className="mb-4 mt-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 sm:h-8 sm:w-8"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
