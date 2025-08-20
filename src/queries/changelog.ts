import { FetchError, httpGet } from '../lib/query-http';

export interface ChangelogImage {
  title: string;
  url: string;
}

export interface ChangelogDocument {
  _id: string;
  slug: string;
  title: string;
  description: string;
  images?: ChangelogImage[];
  createdAt: string;
  updatedAt: string;
}

type ListChangelogQuery = {
  limit?: number;
};

export async function listChangelog(query: ListChangelogQuery = {}) {
  try {
    const changelogs = await httpGet<ChangelogDocument[]>(
      `/v1-list-changelog`,
      query,
    );

    return changelogs;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return [];
    }

    throw error;
  }
}