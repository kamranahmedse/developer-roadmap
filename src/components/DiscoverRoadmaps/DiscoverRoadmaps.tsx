import { Shapes } from 'lucide-react';
import type { ListShowcaseRoadmapResponse } from '../../api/roadmap';
import { Pagination } from '../Pagination/Pagination';
import { SearchRoadmap } from './SearchRoadmap';
import { EmptyDiscoverRoadmaps } from './EmptyDiscoverRoadmaps';
import { Rating } from '../Rating/Rating';
import { useEffect, useState } from 'react';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { LoadingRoadmaps } from '../ExploreAIRoadmap/LoadingRoadmaps';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { DiscoverRoadmapSorting } from './DiscoverRoadmapSorting';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal.tsx';
import { Tooltip } from '../Tooltip.tsx';

type DiscoverRoadmapsProps = {};

export type SortByValues = 'rating' | '-rating' | 'createdAt' | '-createdAt';

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

export function DiscoverRoadmaps(props: DiscoverRoadmapsProps) {
  const toast = useToast();

  const [pageState, setPageState] = useState<PageState>({
    searchTerm: '',
    sortBy: 'createdAt',
    currentPage: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapsResponse, setRoadmapsResponse] =
    useState<ListShowcaseRoadmapResponse | null>(null);

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

  const loadAIRoadmaps = async (
    currPage: number = 1,
    searchTerm: string = '',
    sortBy: SortByValues = 'createdAt',
  ) => {
    const { response, error } = await httpGet<ListShowcaseRoadmapResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-showcase-roadmap`,
      {
        currPage,
        ...(searchTerm && { searchTerm }),
        ...(sortBy && { sortBy }),
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    setRoadmapsResponse(response);
  };

  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);

  const roadmaps = roadmapsResponse?.data || [];

  const loadingIndicator = isLoading && <LoadingRoadmaps />;

  return (
    <>
      {isCreatingRoadmap && (
        <CreateRoadmapModal
          onClose={() => {
            setIsCreatingRoadmap(false);
          }}
        />
      )}

      <div className="border-b bg-white pt-10 pb-7">
        <div className="container text-left">
          <div className="flex flex-col items-start bg-white">
            <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
              Community Roadmaps
            </h1>
            <p className="mb-5 text-base text-gray-500">
              A selected list of community-created roadmaps
            </p>
            <div className="relative">
              <div className="flex flex-col sm:flex-row items-center gap-1.5">
                <span className="group relative normal-case">
                  <button
                    className="rounded-md bg-black px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-black"
                    onClick={() => {
                      setIsCreatingRoadmap(true);
                    }}
                  >
                    Create your own roadmap
                  </button>
                </span>
                <span className="group relative normal-case">
                  <a
                    href="/roadmaps"
                    className="inline-block rounded-md bg-gray-300 px-3.5 py-1.5 text-sm text-black sm:py-1.5 sm:text-sm"
                  >
                    Visit our official roadmaps
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 py-3">
        <section className="container mx-auto py-3">
          <div className="mb-3.5 flex items-stretch justify-between gap-2.5">
            <SearchRoadmap
              total={roadmapsResponse?.totalCount || 0}
              value={pageState.searchTerm}
              isLoading={isLoading}
              onValueChange={(value) => {
                setPageState({
                  ...pageState,
                  searchTerm: value,
                  currentPage: 1,
                });
              }}
            />

            <DiscoverRoadmapSorting
              sortBy={pageState.sortBy}
              onSortChange={(sortBy) => {
                setPageState({
                  ...pageState,
                  sortBy,
                });
              }}
            />
          </div>

          {loadingIndicator}
          {roadmaps.length === 0 && !isLoading && <EmptyDiscoverRoadmaps />}
          {roadmaps.length > 0 && !isLoading && (
            <>
              <ul className="mb-4 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {roadmaps.map((roadmap) => {
                  const roadmapLink = `/r/${roadmap.slug}`;
                  const totalRatings = Object.keys(
                    roadmap.ratings?.breakdown || [],
                  ).reduce(
                    (acc: number, key: string) =>
                      acc + roadmap.ratings.breakdown[key as any],
                    0,
                  );
                  return (
                    <li key={roadmap._id} className="h-full min-h-[175px]">
                      <a
                        key={roadmap._id}
                        href={roadmapLink}
                        className="flex h-full flex-col rounded-lg border bg-white p-3.5 transition-colors hover:border-gray-300 hover:bg-gray-50"
                        target={'_blank'}
                      >
                        <div className="grow">
                          <h2 className="text-balance text-base font-bold leading-tight">
                            {roadmap.title}
                          </h2>
                          <p className="mt-2 text-sm text-gray-500">
                            {roadmap.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Shapes size={15} className="inline-block" />
                            {Intl.NumberFormat('en-US', {
                              notation: 'compact',
                            }).format(roadmap.topicCount)}{' '}
                          </span>

                          <Rating
                            rating={roadmap?.ratings?.average || 0}
                            readOnly={true}
                            starSize={16}
                            total={totalRatings}
                          />
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <Pagination
                currPage={roadmapsResponse?.currPage || 1}
                totalPages={roadmapsResponse?.totalPages || 1}
                perPage={roadmapsResponse?.perPage || 0}
                totalCount={roadmapsResponse?.totalCount || 0}
                onPageChange={(page) => {
                  setPageState({
                    ...pageState,
                    currentPage: page,
                  });
                }}
              />
            </>
          )}
        </section>
      </div>
    </>
  );
}
