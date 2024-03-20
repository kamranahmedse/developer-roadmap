import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { httpGet } from '../../lib/http';
import { getRelativeTimeString } from '../../lib/date';
import { Eye, Loader2, RefreshCcw } from 'lucide-react';
import { AIRoadmapAlert } from '../GenerateRoadmap/AIRoadmapAlert.tsx';
import { ExploreAISearch } from './ExploreAISearch.tsx';
import { formatCommaNumber } from '../../lib/number.ts';
import { ExploreAISorting, type SortByValues } from './ExploreAISorting.tsx';
import { getUrlParams, setUrlParams } from '../../lib/browser.ts';
import { Pagination } from '../Pagination/Pagination.tsx';

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

export function ExploreAIRoadmap() {
  const toast = useToast();

  const {
    q: searchTerm,
    s: sortBy = 'createdAt',
    p: defaultCurrPage = 1,
  } = getUrlParams() as {
    q: string;
    s: SortByValues;
    p: string;
  };

  const [isLoading, setIsLoading] = useState(true);
  const [roadmapsResponse, setRoadmapsResponse] =
    useState<ExploreRoadmapsResponse | null>(null);

  const currPage = roadmapsResponse?.currPage || +defaultCurrPage || 1;
  const totalPages = roadmapsResponse?.totalPages || 1;
  const totalCount = roadmapsResponse?.totalCount || 0;

  const perPage = roadmapsResponse?.perPage || 0;
  const hasNextPage = currPage < totalPages;
  const hasPrevPage = currPage > 1;

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

  useEffect(() => {
    loadAIRoadmaps(
      +defaultCurrPage,
      searchTerm,
      sortBy as SortByValues,
    ).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const roadmaps = roadmapsResponse?.data || [];

  return (
    <section className="container mx-auto py-3 sm:py-6">
      <AIRoadmapAlert isListing />

      <div className="flex items-stretch justify-between">
        <ExploreAISearch
          key={searchTerm}
          value={searchTerm}
          onSubmit={(term) => {
            setIsLoading(true);
            setUrlParams({ q: term, p: '1' });
            loadAIRoadmaps(1, term, sortBy as SortByValues).finally(() => {
              setIsLoading(false);
            });
          }}
        />

        <ExploreAISorting
          sortBy={sortBy}
          onSortChange={(sortBy) => {
            setIsLoading(true);
            setUrlParams({ s: sortBy, p: '1' });
            loadAIRoadmaps(1, searchTerm, sortBy).finally(() => {
              setIsLoading(false);
            });
          }}
        />
      </div>

      {isLoading ? (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {new Array(21).fill(0).map((_, index) => (
            <li
              key={index}
              className="h-[75px] animate-pulse rounded-md border bg-gray-100"
            ></li>
          ))}
        </ul>
      ) : (
        <div>
          {roadmaps?.length === 0 ? (
            <div className="text-center text-gray-800">No roadmaps found</div>
          ) : (
            <>
              <ul className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {roadmaps.map((roadmap) => {
                  const roadmapLink = `/ai?id=${roadmap._id}`;
                  return (
                    <a
                      key={roadmap._id}
                      href={roadmapLink}
                      className="flex flex-col rounded-md border transition-colors hover:bg-gray-100"
                      target={'_blank'}
                    >
                      <h2 className="flex-grow px-2.5 py-2.5 text-base font-medium leading-tight">
                        {roadmap.title}
                      </h2>
                      <div className="flex items-center justify-between gap-2 px-2.5 py-2">
                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Eye size={15} className="inline-block" />
                          {Intl.NumberFormat('en-US', {
                            notation: 'compact',
                          }).format(roadmap.viewCount)}{' '}
                          views
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                          {getRelativeTimeString(String(roadmap?.createdAt))}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </ul>

              <Pagination
                currPage={currPage}
                totalPages={totalPages}
                perPage={perPage}
                isDisabled={isLoading}
                totalCount={totalCount}
                onPageChange={(page) => {
                  setIsLoading(true);
                  setUrlParams({ p: String(page) });
                  loadAIRoadmaps(
                    page,
                    searchTerm,
                    sortBy as SortByValues,
                  ).finally(() => {
                    setIsLoading(false);
                  });
                }}
              />
            </>
          )}
        </div>
      )}
    </section>
  );
}
