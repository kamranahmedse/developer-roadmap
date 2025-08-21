import { FetchError, httpGet } from '../lib/query-http';

export const allowedOfficialRoadmapTopicResourceType = [
  'roadmap',
  'official',
  'opensource',
  'article',
  'course',
  'podcast',
  'video',
  'book',
  'feed',
] as const;
export type AllowedOfficialRoadmapTopicResourceType =
  (typeof allowedOfficialRoadmapTopicResourceType)[number];

export type OfficialRoadmapTopicResource = {
  _id: string;
  type: AllowedOfficialRoadmapTopicResourceType;
  title: string;
  url: string;
};

export interface OfficialRoadmapTopicContentDocument {
  _id: string;
  roadmapSlug: string;
  nodeId: string;
  description: string;
  resources: OfficialRoadmapTopicResource[];
  createdAt: Date;
  updatedAt: Date;
}

type GetOfficialRoadmapTopicOptions = {
  roadmapSlug: string;
  nodeId: string;
};

export type SyncToDatabaseTopicContent = Omit<
  OfficialRoadmapTopicContentDocument,
  'createdAt' | 'updatedAt' | '_id' | 'resources'
> & {
  resources: Omit<OfficialRoadmapTopicResource, '_id'>[];
};

export async function getOfficialRoadmapTopic(
  options: GetOfficialRoadmapTopicOptions,
) {
  const { roadmapSlug, nodeId } = options;

  try {
    const topic = await httpGet<OfficialRoadmapTopicContentDocument>(
      `/v1-official-roadmap-topic/${roadmapSlug}/${nodeId}`,
    );

    return topic;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export function prepareOfficialRoadmapTopicContent(
  topic: OfficialRoadmapTopicContentDocument,
) {
  const { description, resources = [] } = topic;

  let content = description;
  if (resources.length > 0) {
    content += `\n\nVisit the following resources to learn more:\n\n${resources.map((resource) => `- [@${resource.type}@${resource.title}](${resource.url})`).join('\n')}`;
  }

  return content;
}
