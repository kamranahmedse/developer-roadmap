import { FetchError, httpGet } from '../lib/query-http';

export const allowedOfficialGuideStatus = ['draft', 'published'] as const;
export type AllowedOfficialGuideStatus =
  (typeof allowedOfficialGuideStatus)[number];

export interface OfficialGuideDocument {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  content: any;
  authorId: string;
  roadmapId?: string;
  featuredImage?: string;
  status: AllowedOfficialGuideStatus;
  publishedAt?: Date;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  tags?: string[];

  questionCount?: number;
  questionTopicCount?: number;

  viewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

type ListOfficialGuidesQuery = {
  authorSlug?: string;
  roadmapId?: string;
};

export async function listOfficialGuides(query: ListOfficialGuidesQuery = {}) {
  try {
    const guides = await httpGet<OfficialGuideDocument[]>(
      `/v1-list-official-guides`,
      query,
    );

    return guides.sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);

      return bDate.getTime() - aDate.getTime();
    });
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return [];
    }

    throw error;
  }
}

export interface OfficialAuthorDocument {
  _id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type GuideWithAuthor = OfficialGuideDocument & {
  author?: Pick<
    OfficialAuthorDocument,
    'name' | 'slug' | 'avatar' | 'bio' | 'socialLinks'
  >;
  relatedGuides?: Pick<OfficialGuideDocument, 'title' | 'slug' | 'roadmapId'>[];
};

export type OfficialGuideResponse = GuideWithAuthor;

export async function getOfficialGuide(slug: string, roadmapId?: string) {
  try {
    const guide = await httpGet<OfficialGuideResponse>(
      `/v1-official-guide/${slug}`,
      {
        ...(roadmapId ? { roadmapId } : {}),
      },
    );

    return guide;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function listOfficialAuthors() {
  try {
    const authors = await httpGet<OfficialAuthorDocument[]>(
      `/v1-list-official-authors`,
    );

    return authors;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return [];
    }

    throw error;
  }
}

export function getOfficialGuideHref(slug: string, roadmapId?: string) {
  const isExternal = roadmapId && roadmapId !== 'questions';
  return isExternal
    ? `${import.meta.env.PUBLIC_APP_URL}/${roadmapId}/${slug}`
    : roadmapId
      ? `/${roadmapId}/${slug}`
      : `/guides/${slug}`;
}
