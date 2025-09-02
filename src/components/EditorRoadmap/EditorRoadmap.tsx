import { useEffect, useState, type CSSProperties } from 'react';
import {
  EditorRoadmapRenderer,
  type RoadmapRendererProps,
} from './EditorRoadmapRenderer';
import { Spinner } from '../ReactIcons/Spinner';
import {
  clearMigratedRoadmapProgress,
  type ResourceType,
} from '../../lib/resource-progress';
import { httpGet } from '../../lib/http';
import { getUrlParams } from '../../lib/browser.ts';
import { RoadmapFloatingChat } from '../FrameRenderer/RoadmapFloatingChat.tsx';

type EditorRoadmapProps = {
  resourceId: string;
  resourceType?: ResourceType;
  hasChat?: boolean;
  dimensions: {
    width: number;
    height: number;
  };
};

export function EditorRoadmap(props: EditorRoadmapProps) {
  const {
    resourceId,
    resourceType = 'roadmap',
    dimensions,
    hasChat = true,
  } = props;

  const [hasSwitchedRoadmap, setHasSwitchedRoadmap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState<
    Omit<RoadmapRendererProps, 'resourceId'> | undefined
  >(undefined);

  const loadRoadmapData = async () => {
    setIsLoading(true);
    const { r: switchRoadmapId } = getUrlParams();

    const { response, error } = await httpGet<
      Omit<RoadmapRendererProps, 'resourceId'>
    >(
      `${import.meta.env.PUBLIC_API_URL}/v1-official-roadmap/${switchRoadmapId || resourceId}`,
    );

    if (error) {
      console.error(error);
      return;
    }

    setRoadmapData(response);
    setIsLoading(false);
    setHasSwitchedRoadmap(!!switchRoadmapId);
  };

  useEffect(() => {
    clearMigratedRoadmapProgress(resourceType, resourceId);
    loadRoadmapData().finally();
  }, [resourceId]);

  const aspectRatio = dimensions.width / dimensions.height;

  if (!roadmapData || isLoading) {
    return (
      <div
        style={
          !hasSwitchedRoadmap
            ? ({
                '--aspect-ratio': aspectRatio,
              } as CSSProperties)
            : undefined
        }
        className={
          'mt-5 flex aspect-[var(--aspect-ratio)] w-full flex-col justify-center'
        }
      >
        <div className="flex w-full justify-center">
          <Spinner
            className="h-6 w-6 animate-spin sm:h-12 sm:w-12"
            isDualRing={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={
        !hasSwitchedRoadmap
          ? ({
              '--aspect-ratio': aspectRatio,
            } as CSSProperties)
          : undefined
      }
      className={
        'mt-5 flex aspect-[var(--aspect-ratio)] w-full flex-col justify-center'
      }
    >
      <EditorRoadmapRenderer
        {...roadmapData}
        dimensions={dimensions}
        resourceId={resourceId}
      />
      {hasChat && <RoadmapFloatingChat roadmapId={resourceId} />}
    </div>
  );
}
