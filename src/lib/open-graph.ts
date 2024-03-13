type GuideOpenGraphParams = {
  type: 'guide';
  authorName: string;
  authorAvatar?: string;
  title: string;
  description: string;
};

type RoadmapOpenGraphParams = {
  type: 'roadmap';
  title: string;
  description: string;
};

export function getOpenGraphImageUrl(
  params: GuideOpenGraphParams | RoadmapOpenGraphParams,
) {
  return `${import.meta.env.PUBLIC_API_URL}/v1-open-graph?${new URLSearchParams(params)}`;
}
