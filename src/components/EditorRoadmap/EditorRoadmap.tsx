import { useEffect, useState } from 'react';
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
  dimensions?: {
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
        className="flex w-full justify-center"
        style={{
          ...(dimensions || {}),
        }}
      >
        <Spinner
          innerFill="#2563eb"
          outerFill="#E5E7EB"
          className="h-6 w-6 animate-spin sm:h-12 sm:w-12"
        />
      </div>
    );
  }

  return (
    <div
      style={{
        ...(dimensions || {}),
      }}
    >
      <EditorRoadmapRenderer {...roadmapData} resourceId={resourceId} />
      <ProgressNudge resourceId={resourceId} resourceType={resourceType} />
    </div>
  );
}
