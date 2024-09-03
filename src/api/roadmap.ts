import { type APIContext } from 'astro';
import { api } from './api.ts';
import type { RoadmapDocument } from '../components/CustomRoadmap/CreateRoadmap/CreateRoadmapModal.tsx';
import type { PageType } from '../components/CommandMenu/CommandMenu.tsx';

export type ListShowcaseRoadmapResponse = {
  data: Pick<
    RoadmapDocument,
    | '_id'
    | 'title'
    | 'description'
    | 'slug'
    | 'creatorId'
    | 'visibility'
    | 'createdAt'
    | 'topicCount'
    | 'ratings'
  >[];
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

export function roadmapApi(context: APIContext) {
  return {
    listShowcaseRoadmap: async function () {
      const searchParams = new URLSearchParams(context.url.searchParams);
      return api(context).get<ListShowcaseRoadmapResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-list-showcase-roadmap`,
        searchParams,
      );
    },
    isShowcaseRoadmap: async function (slug: string) {
      return api(context).get<{
        isShowcase: boolean;
      }>(`${import.meta.env.PUBLIC_API_URL}/v1-is-showcase-roadmap/${slug}`);
    },
  };
}

export type ProjectPageType = {
  id: string;
  title: string;
  url: string;
};

export async function getProjectList() {
  const baseUrl = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://roadmap.sh';
  const pages = await fetch(`${baseUrl}/pages.json`).catch((err) => {
    console.error(err);
    return [];
  });

  const pagesJson = await (pages as any).json();
  const projects: ProjectPageType[] = pagesJson
    .filter((page: any) => page?.group?.toLowerCase() === 'projects')
    .map((page: any) => ({
      id: page.id,
      title: page.title,
      url: page.url,
    }));

  return projects;
}
