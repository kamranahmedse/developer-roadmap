import { useEffect, useRef, useState } from 'preact/hooks';
import { wireframeJSONToSVG } from 'roadmap-renderer';
import { Spinner } from '../ReactIcons/Spinner';
import { httpGet, httpPut } from '../../lib/http';
import { renderTopicProgress } from '../../lib/resource-progress';
import '../FrameRenderer/FrameRenderer.css';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';

export type ProgressMapProps = {
  teamId: string;
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  onClose: () => void;
};

export function TeamResource(props: ProgressMapProps) {
  const { resourceId, resourceType, teamId, onClose } = props;

  const containerEl = useRef<HTMLDivElement>(null);
  const popupBodyEl = useRef<HTMLDivElement>(null);

  const [isUpdating, setIsUpdating] = useState(false);

  const [error, setError] = useState('');
  const [removedItems, setRemovedItems] = useState<string[]>([]);

  useEffect(() => {
    function onTopicClick(e: any) {
      const groupEl = e.target.closest('.clickable-group');
      const groupId = groupEl?.dataset?.groupId;

      if (!groupId || groupId.startsWith('ext_link')) {
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

  let resourceJsonUrl = 'https://roadmap.sh';
  if (resourceType === 'roadmap') {
    resourceJsonUrl += `/${resourceId}.json`;
  } else {
    resourceJsonUrl += `/best-practices/${resourceId}.json`;
  }

  async function renderTeamResourceConfig() {
    const apiEndpoint = `${
      import.meta.env.PUBLIC_API_URL
    }/v1-get-team-resource-config/${teamId}`;

    const { response, error } = await httpGet<{
      removed: string[];
    }>(`${apiEndpoint}?resourceType=${resourceType}&resourceId=${resourceId}`);
    if (error || !response) {
      setError(error?.message || 'Failed to get team progress');
      return;
    }

    const { removed = [] } = response;
    removed.forEach((topicId: string) => {
      renderTopicProgress(topicId, 'removed');
    });
  }

  async function renderResource(jsonUrl: string) {
    const res = await fetch(jsonUrl);
    const json = await res.json();
    const svg = await wireframeJSONToSVG(json, {
      fontURL: '/fonts/balsamiq.woff2',
    });

    containerEl.current?.replaceChildren(svg);

    await renderTeamResourceConfig();
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
    const { error, response } = await httpPut(
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
      setError(error?.message || 'Error adding roadmap');
      return;
    }

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

    renderResource(resourceJsonUrl).catch((err) => {
      console.error(err);
      setError('Something went wrong. Please try again!');
    });
  }, []);

  return (
    <div class="fixed left-0 right-0 top-0 z-50 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50">
      <div class="relative mx-auto h-full w-full max-w-4xl p-4 md:h-auto">
        <div
          ref={popupBodyEl}
          class="popup-body relative rounded-lg bg-white shadow"
        >
          <div className={'sticky top-0 mb-3 bg-gray-900 p-3'}>
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
          <div id="resource-map" ref={containerEl} className="px-4">
            {!error && (
              <div class="flex w-full justify-center">
                <Spinner
                  isDualRing={false}
                  className="mb-4 mt-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 sm:h-8 sm:w-8"
                />
              </div>
            )}

            {error && <div className={'text-red-500'}>{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
