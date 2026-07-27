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

export type SyncToDatabaseTopicContent = Omit<
  OfficialRoadmapTopicContentDocument,
  'createdAt' | 'updatedAt' | '_id' | 'resources'
> & {
  resources: Omit<OfficialRoadmapTopicResource, '_id'>[];
};

export function escapeMarkdownLinkText(text: string) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/</g, '\\<')
    .replace(/>/g, '\\>')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]');
}

export function formatOfficialRoadmapTopicResourceLink(
  resource: Pick<OfficialRoadmapTopicResource, 'type' | 'title' | 'url'>,
) {
  return `- [@${resource.type}@${escapeMarkdownLinkText(resource.title)}](${resource.url})`;
}

export function prepareOfficialRoadmapTopicContent(
  topic: OfficialRoadmapTopicContentDocument,
) {
  const { description, resources = [] } = topic;

  let content = description;
  if (resources.length > 0) {
    const resourceLinks = resources
      .map(formatOfficialRoadmapTopicResourceLink)
      .join('\n');

    content += `\n\nVisit the following resources to learn more:\n\n${resourceLinks}`;
  }

  return content;
}
