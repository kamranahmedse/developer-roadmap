import { useEffect, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { RoadmapHeader } from './RoadmapHeader';
import { TopicDetail } from '../TopicDetail/TopicDetail';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import { currentRoadmap } from '../../stores/roadmap';
import { RestrictedPage } from './RestrictedPage';
import { FlowRoadmapRenderer } from './FlowRoadmapRenderer';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { httpGet, type FetchError } from '../../lib/query-http';
import { useCustomRoadmap } from '../../hooks/use-custom-roadmap';

export const allowedLinkTypes = [
  'video',
  'article',
  'opensource',
  'course',
  'website',
  'podcast',
  'roadmap.sh',
  'official',
  'roadmap',
  'feed',
] as const;

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

export type CreatorType = {
  id: string;
  name: string;
  avatar: string;
};

export type GetRoadmapResponse = RoadmapDocument & {
  canManage: boolean;
  creator?: CreatorType;
  team?: CreatorType;
  unseenRatingCount: number;
};

export function hideRoadmapLoader() {
  const loaderEl = document.querySelector(
    '[data-roadmap-loader]',
  ) as HTMLElement;
  if (loaderEl) {
    loaderEl.remove();
  }
}

type CustomRoadmapProps = {
  isEmbed?: boolean;
  slug?: string;
};

export function CustomRoadmap(props: CustomRoadmapProps) {
  const { isEmbed = false, slug } = props;

  const { id, secret } = getUrlParams() as { id: string; secret: string };

  const [isLoading, setIsLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<GetRoadmapResponse | null>(null);

  const { data, error } = useCustomRoadmap({
    id,
    secret,
    slug,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    document.title = `${data.title} - roadmap.sh`;
    setRoadmap(data);
    currentRoadmap.set(data);
    setIsLoading(false);
    hideRoadmapLoader();
  }, [data]);

  useEffect(() => {
    if (!error) {
      return;
    }

    setIsLoading(false);
    hideRoadmapLoader();
  }, [error]);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <RestrictedPage error={error} />;
  }

  return (
    <>
      {!isEmbed && <RoadmapHeader />}
      <FlowRoadmapRenderer isEmbed={isEmbed} roadmap={roadmap!} />
      <TopicDetail
        resourceId={roadmap!._id}
        resourceTitle={roadmap!.title}
        resourceType="roadmap"
        renderer='editor'
        isEmbed={isEmbed}
        canSubmitContribution={false}
      />
    </>
  );
}
