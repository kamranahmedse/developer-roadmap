import { useEffect, useRef, useState } from 'preact/hooks';
import { wireframeJSONToSVG } from 'roadmap-renderer';
import { Spinner } from '../ReactIcons/Spinner';
import '../FrameRenderer/FrameRenderer.css';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
import type { TeamMember } from './TeamProgressPage';
import { httpGet } from '../../lib/http';
import { renderTopicProgress } from '../../lib/resource-progress';

export type ProgressMapProps = {
  member: TeamMember;
  teamId: string;
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  onClose: () => void;
};

type MemberProgressResponse = {
  removed: string[];
  done: string[];
  learning: string[];
  skipped: string[];
};

export function MemberProgressModal(props: ProgressMapProps) {
  const { resourceId, member, resourceType, teamId, onClose } = props;

  const containerEl = useRef<HTMLDivElement>(null);
  const popupBodyEl = useRef<HTMLDivElement>(null);

  const [memberProgress, setMemberProgress] =
    useState<MemberProgressResponse>();
  const [isLoading, setIsLoading] = useState(true);

  let resourceJsonUrl = 'https://roadmap.sh';
  if (resourceType === 'roadmap') {
    resourceJsonUrl += `/${resourceId}.json`;
  } else {
    resourceJsonUrl += `/best-practices/${resourceId}.json`;
  }

  async function getMemberProgress(
    teamId: string,
    memberId: string,
    resourceType: string,
    resourceId: string
  ) {
    const { error, response } = await httpGet<MemberProgressResponse>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-get-member-resource-progress/${teamId}/${memberId}?resourceType=${resourceType}&resourceId=${resourceId}`
    );
    if (error || !response) {
      alert(error?.message || 'Failed to get member progress');
      return;
    }

    setMemberProgress(response);

    return response;
  }

  async function renderResource(jsonUrl: string) {
    const res = await fetch(jsonUrl);
    const json = await res.json();
    const svg = await wireframeJSONToSVG(json, {
      fontURL: '/fonts/balsamiq.woff2',
    });

    containerEl.current?.replaceChildren(svg);
  }

  useKeydown('Escape', () => {
    onClose();
  });

  useOutsideClick(popupBodyEl, () => {
    onClose();
  });

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

    Promise.all([
      renderResource(resourceJsonUrl),
      getMemberProgress(teamId, member._id, resourceType, resourceId),
    ])
      .then(([_, memberProgress = {}]) => {
        const {
          removed = [],
          done = [],
          learning = [],
          skipped = [],
        } = memberProgress;

        removed.forEach((id: string) => renderTopicProgress(id, 'removed'));
        done.forEach((id: string) => renderTopicProgress(id, 'done'));
        learning.forEach((id: string) => renderTopicProgress(id, 'learning'));
        skipped.forEach((id: string) => renderTopicProgress(id, 'skipped'));
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong. Please try again!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const currProgress = member.progress.find((p) => p.resourceId === resourceId);
  const memberDone = currProgress?.done || 0;
  const memberLearning = currProgress?.learning || 0;
  const memberSkipped = currProgress?.skipped || 0;
  const memberTotal = currProgress?.total || 0;

  const progressPercentage = Math.round((memberDone / memberTotal) * 100);

  return (
    <div class="fixed left-0 right-0 top-0 z-50 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50">
      <div class="relative mx-auto h-full w-full max-w-4xl p-4 md:h-auto">
        <div
          ref={popupBodyEl}
          class="popup-body relative rounded-lg bg-white shadow"
        >
          <div className="p-4">
            <h2 className={'mb-3 text-center text-2xl font-bold'}>
              {member.name}'s Progress
            </h2>
            <p class="-mx-4 flex items-center justify-center border-b border-t py-2 text-sm">
              <span class="mr-2.5 rounded-sm bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
                <span>{progressPercentage}</span>% Done
              </span>

              <span>
                <span>{memberDone}</span> completed
              </span>
              <span class="mx-1.5 text-gray-400">·</span>
              <span>
                <span data-progress-learning="">{memberLearning}</span> in
                progress
              </span>
              <span class="mx-1.5 text-gray-400">·</span>
              <span>
                <span data-progress-skipped="">{memberSkipped}</span> skipped
              </span>
              <span class="mx-1.5 text-gray-400">·</span>
              <span>
                <span data-progress-total="">{memberTotal}</span> Total
              </span>
            </p>
          </div>

          <div ref={containerEl} className="px-4 pb-2"></div>

          {isLoading && (
            <div class="flex w-full justify-center">
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
