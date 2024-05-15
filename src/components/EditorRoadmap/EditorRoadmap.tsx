import { useEffect, useState, type CSSProperties } from 'react';
import {
  EditorRoadmapRenderer,
  type RoadmapRendererProps,
} from './EditorRoadmapRenderer';
import { Spinner } from '../ReactIcons/Spinner';
import type { ResourceType } from '../../lib/resource-progress';
import { httpGet } from '../../lib/http';
import { ProgressNudge } from '../FrameRenderer/ProgressNudge';

type EditorRoadmapProps = {
  resourceId: string;
  resourceType?: ResourceType;
  dimensions: {
    width: number;
    height: number;
  };
};

export function EditorRoadmap(props: EditorRoadmapProps) {
  const { resourceId, resourceType = 'roadmap', dimensions } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState<
    Omit<RoadmapRendererProps, 'resourceId'> | undefined
  >(undefined);

  const loadRoadmapData = async () => {
    setIsLoading(true);
    const { response, error } = await httpGet<
      Omit<RoadmapRendererProps, 'resourceId'>
    >(`/${resourceId}.json`);

    if (error) {
      console.error(error);
      return;
    }

    setRoadmapData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    loadRoadmapData().finally();
  }, [resourceId]);

  if (!roadmapData || isLoading) {
    return (
      <div
        style={
          {
            '--aspect-ratio': dimensions.width / dimensions.height,
          } as CSSProperties
        }
        className="flex aspect-[var(--aspect-ratio)] w-full justify-center"
      >
        <div className="flex w-full justify-center">
          <Spinner
            innerFill="#2563eb"
            outerFill="#E5E7EB"
            className="h-6 w-6 animate-spin sm:h-12 sm:w-12"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={
        {
          '--aspect-ratio': dimensions.width / dimensions.height,
        } as CSSProperties
      }
      className="flex aspect-[var(--aspect-ratio)] w-full justify-center"
    >
      <EditorRoadmapRenderer
        {...roadmapData}
        dimensions={dimensions}
        resourceId={resourceId}
      />
      <ProgressNudge resourceId={resourceId} resourceType={resourceType} />
    </div>
  );
}
