import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { httpGet } from '../../lib/http';
import { AIRoadmapAlert } from '../GenerateRoadmap/AIRoadmapAlert.tsx';
import { ExploreAISearch } from './ExploreAISearch.tsx';
import { ExploreAISorting, type SortByValues } from './ExploreAISorting.tsx';
import {
  deleteUrlParam,
  getUrlParams,
  setUrlParams,
} from '../../lib/browser.ts';
import { Pagination } from '../Pagination/Pagination.tsx';
import { LoadingRoadmaps } from './LoadingRoadmaps.tsx';
import { EmptyRoadmaps } from './EmptyRoadmaps.tsx';
import { AIRoadmapsList } from './AIRoadmapsList.tsx';
import { currentRoadmap } from '../../stores/roadmap.ts';

export interface AIRoadmapDocument {
  _id?: string;
  term: string;
  title: string;
  data: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

type ExploreRoadmapsResponse = {
  data: AIRoadmapDocument[];
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

type QueryParams = {
  q?: string;
  s?: SortByValues;
  p?: string;
};

type PageState = {
  searchTerm: string;
  sortBy: SortByValues;
  currentPage: number;
};

export function ExploreAIRoadmap() {
  const toast = useToast();

  const [pageState, setPageState] = useState<PageState>({
    searchTerm: '',
    sortBy: 'createdAt',
    currentPage: 0,
  });

  useEffect(() => {
    const queryParams = getUrlParams() as QueryParams;

    setPageState({
      searchTerm: queryParams.q || '',
      sortBy: queryParams.s || 'createdAt',
      currentPage: +(queryParams.p || '1'),
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!pageState.currentPage) {
      return;
    }

    // only set the URL params if the user modified anything
    if (
      pageState.currentPage !== 1 ||
      pageState.searchTerm !== '' ||
      pageState.sortBy !== 'createdAt'
    ) {
      setUrlParams({
        q: pageState.searchTerm,
        s: pageState.sortBy,
        p: String(pageState.currentPage),
      });
    } else {
      deleteUrlParam('q');
      deleteUrlParam('s');
      deleteUrlParam('p');
    }

    loadAIRoadmaps(
      pageState.currentPage,
      pageState.searchTerm,
      pageState.sortBy,
    ).finally(() => {
      setIsLoading(false);
    });
  }, [pageState]);

  const [isLoading, setIsLoading] = useState(true);
  const [roadmapsResponse, setRoadmapsResponse] =
    useState<ExploreRoadmapsResponse | null>(null);

  const loadAIRoadmaps = async (
    currPage: number = 1,
    searchTerm: string = '',
    sortBy: SortByValues = 'createdAt',
  ) => {
    const { response, error } = await httpGet<ExploreRoadmapsResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-ai-roadmaps`,
      {
        currPage,
        ...(searchTerm && { term: searchTerm }),
        ...(sortBy && { sortBy }),
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    setRoadmapsResponse(response);
  };

  const roadmaps = roadmapsResponse?.data || [];

  const loadingIndicator = isLoading && <LoadingRoadmaps />;
  const emptyRoadmaps = !isLoading && roadmaps.length === 0 && (
    <EmptyRoadmaps />
  );

  const roadmapsList = !isLoading && roadmaps.length > 0 && (
    <>
      <AIRoadmapsList response={roadmapsResponse} />
      <Pagination
        currPage={roadmapsResponse?.currPage || 1}
        totalPages={roadmapsResponse?.totalPages || 1}
        perPage={roadmapsResponse?.perPage || 0}
        isDisabled={isLoading}
        totalCount={roadmapsResponse?.totalCount || 0}
        onPageChange={(page) => {
          setPageState({
            ...pageState,
            currentPage: page,
          });
        }}
      />
    </>
  );

  return (
    <section className="container mx-auto py-3 sm:py-6">
      <AIRoadmapAlert isListing />

      <div className="my-3.5 flex items-stretch justify-between gap-2.5">
        <ExploreAISearch
          isLoading={isLoading}
          value={pageState.searchTerm}
          onSubmit={(term) => {
            setPageState({
              ...pageState,
              searchTerm: term,
              currentPage: 1,
            });
          }}
        />

        <ExploreAISorting
          sortBy={pageState.sortBy}
          onSortChange={(sortBy) => {
            setPageState({
              ...pageState,
              sortBy,
              currentPage: 1,
            });
          }}
        />
      </div>

      {loadingIndicator}
      {emptyRoadmaps}
      {roadmapsList}
    </section>
  );
}
