import { useEffect, useRef, useState, type RefObject } from 'react';
import '../FrameRenderer/FrameRenderer.css';
import { Spinner } from '../ReactIcons/Spinner';
import {
  renderTopicProgress,
  topicSelectorAll,
} from '../../lib/resource-progress';
import { useToast } from '../../hooks/use-toast';
import { replaceChildren } from '../../lib/dom.ts';
import type { GetUserProfileRoadmapResponse } from '../../api/user.ts';
import { ReadonlyEditor } from '@roadmapsh/editor';
import { cn } from '../../lib/classname.ts';

export type UserProfileRoadmapRendererProps = GetUserProfileRoadmapResponse & {
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
};

export function UserProfileRoadmapRenderer(
  props: UserProfileRoadmapRendererProps,
) {
  const {
    resourceId,
    resourceType,
    done,
    skipped,
    learning,
    edges,
    nodes,
    isCustomResource,
  } = props;

  const containerEl = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(!isCustomResource);
  const toast = useToast();

  let resourceJsonUrl = 'https://roadmap.sh';
  if (resourceType === 'roadmap') {
    resourceJsonUrl += `/${resourceId}.json`;
  } else {
    resourceJsonUrl += `/best-practices/${resourceId}.json`;
  }

  async function renderResource(jsonUrl: string) {
    const res = await fetch(jsonUrl, {});
    const json = await res.json();
    const { wireframeJSONToSVG } = await import('roadmap-renderer');
    const svg: SVGElement | null = await wireframeJSONToSVG(json, {
      fontURL: '/fonts/balsamiq.woff2',
    });

    replaceChildren(containerEl.current!, svg);
  }

  useEffect(() => {
    if (
      !containerEl.current ||
      !resourceJsonUrl ||
      !resourceId ||
      !resourceType ||
      isCustomResource
    ) {
      return;
    }

    setIsLoading(true);
    renderResource(resourceJsonUrl)
      .then(() => {
        done.forEach((id: string) => renderTopicProgress(id, 'done'));
        learning.forEach((id: string) => renderTopicProgress(id, 'learning'));
        skipped.forEach((id: string) => renderTopicProgress(id, 'skipped'));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.message || 'Something went wrong. Please try again!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div id="customized-roadmap">
      <div
        className={cn(
          'bg-white',
          isCustomResource ? 'w-full' : 'container relative max-w-[1000px]!',
        )}
      >
        {isCustomResource ? (
          <ReadonlyEditor
            roadmap={{
              nodes,
              edges,
            }}
            className="min-h-[1000px]"
            onRendered={(wrapperRef) => {
              done?.forEach((topicId: string) => {
                topicSelectorAll(topicId, wrapperRef?.current!).forEach(
                  (el) => {
                    el.classList.add('done');
                  },
                );
              });

              learning?.forEach((topicId: string) => {
                topicSelectorAll(topicId, wrapperRef?.current!).forEach(
                  (el) => {
                    el.classList.add('learning');
                  },
                );
              });

              skipped?.forEach((topicId: string) => {
                topicSelectorAll(topicId, wrapperRef?.current!).forEach(
                  (el) => {
                    el.classList.add('skipped');
                  },
                );
              });
            }}
            fontFamily="Balsamiq Sans"
            fontURL="/fonts/balsamiq.woff2"
          />
        ) : (
          <div
            id={'resource-svg-wrap'}
            ref={containerEl}
            className="pointer-events-none px-4 pb-2"
          />
        )}

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
  );
}
