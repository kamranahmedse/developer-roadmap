import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { getUrlParams } from '../../lib/browser';
import { httpGet } from '../../lib/http';
import { RoadmapHeader } from './RoadmapHeader';
import { RoadmapRenderer } from './RoadmapRenderer';
import { TopicDetail } from '../TopicDetail/TopicDetail';

export const allowedRoadmapVisibility = [
  'me',
  'friends',
  'team',
  'public',
] as const;
export type AllowedRoadmapVisibility =
  (typeof allowedRoadmapVisibility)[number];
export interface RoadmapDocument {
  _id?: string;
  title: string;
  description?: string;
  creatorId: string;
  teamId?: string;
  visibility: AllowedRoadmapVisibility;
  nodes: any[];
  edges: any[];
  createdAt: Date;
  updatedAt: Date;
}

export const allowedLinkTypes = ["video", "article", "opensource", "course", "website", "podcast"] as const;
export type AllowedLinkTypes = (typeof allowedLinkTypes)[number];
export interface RoadmapContentDocument {
  _id?: string;
  roadmapId: string;
  nodeId: string;
  title: string;
  description: string;
  links: {
    id: string;
    type: AllowedLinkTypes;
    title: string;
    url: string;
  }[];
}

export function hideRoadmapLoader() {
  const loaderEl = document.querySelector(
    '[data-roadmap-loader]'
  ) as HTMLElement;
  if (loaderEl) {
    loaderEl.remove();
  }
}
export function CustomRoadmap() {
  const { id } = getUrlParams() as { id: string };

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<RoadmapDocument | null>(null);

  async function getRoadmap() {
    setIsLoading(true);
    const { response, error } = await httpGet<RoadmapDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-roadmap/${id}`
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    setRoadmap(response);
    setIsLoading(false);
  }

  useEffect(() => {
    getRoadmap().finally(() => {
      hideRoadmapLoader();
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <RoadmapHeader
        title={roadmap?.title!}
        description={roadmap?.description!}
        roadmapId={roadmap?._id!}
      />
      <RoadmapRenderer roadmap={roadmap!} />

      <TopicDetail />
    </>
  );
}
