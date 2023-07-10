import { useEffect, useRef } from 'preact/hooks';
import { Spinner } from '../ReactIcons/Spinner';
import { httpGet } from '../../lib/http';
import { renderTopicProgress } from '../../lib/resource-progress';
import '../FrameRenderer/FrameRenderer.css'

export type ProgressMapProps = {
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice'
  memberId: string;
  teamId: string;
};
export function ProgressMap(props: ProgressMapProps) {
  const { resourceId, resourceType, memberId, teamId } = props;
  const containerEl = useRef<HTMLDivElement>(null);
  let url = 'https://roadmap.sh'
  if (resourceType === 'roadmap') {
    url += `/${resourceId}.json`;
  } else {
    url += `/best-practices/${resourceId}.json`;
  }

  async function renderMemberResourceProgress() {
    const { response, error } = await httpGet<{
      done: string[]
      learning: string[]
      skipped: string[]
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-member-resource-progress/${teamId}/${memberId}?resourceType=roadmap&resourceId=frontend`);
    if (error || !response) {
      alert(error?.message || 'Failed to get team progress');
      return;
    }

    const { done, learning, skipped } = response;
    done.forEach((topicId) => {
      renderTopicProgress(topicId, 'done');
    });

    learning.forEach((topicId) => {
      renderTopicProgress(topicId, 'learning');
    });

    skipped.forEach((topicId) => {
      renderTopicProgress(topicId, 'skipped');
    });
  }

  useEffect(() => {
    if (!containerEl.current || !url || !resourceId || !resourceType || !memberId || !teamId) {
      return;
    }
    let wireframeJSONToSVG: any;

    if (!wireframeJSONToSVG) {
      import('roadmap-renderer').then((mod) => {
        wireframeJSONToSVG = mod.wireframeJSONToSVG;
      });
    }

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return wireframeJSONToSVG(json, {
          fontURL: '/fonts/balsamiq.woff2',
        });
      })
      .then((svg) => {
        containerEl.current?.replaceChildren(svg);
      })
      .then(() => {
        return renderMemberResourceProgress()
      })
      .catch((error) => {
        if (!containerEl.current) {
          return;
        }
        const message = `
    < strong > There was an error.</strong > <br>

      Try loading the page again. or submit an issue on GitHub with following:<br><br>

        ${error.message} <br /> ${error.stack}
        `;
        containerEl.current.innerHTML = `<div class="error py-5 text-center text-red-600 mx-auto">${message}</div>`;
      });
  }, []);

  return (
    <div>
      <div id="resource-map" ref={containerEl} className="h-full overflow-auto">
        <div class="flex w-full justify-center">
          <Spinner className="h-6 w-6 animate-spin fill-blue-600 text-gray-200 sm:h-12 sm:w-12" />
        </div>
      </div>
    </div>
  );
}
