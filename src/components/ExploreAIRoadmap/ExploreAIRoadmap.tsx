import { useCallback, useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { httpGet } from '../../lib/http';
import { getRelativeTimeString } from '../../lib/date';
import { Eye, Loader2, RefreshCcw } from 'lucide-react';
import { AIRoadmapAlert } from '../GenerateRoadmap/AIRoadmapAlert.tsx';

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

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [roadmaps, setRoadmaps] = useState<AIRoadmapDocument[]>([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadAIRoadmaps = useCallback(
    async (currPage: number) => {
      const { response, error } = await httpGet<ExploreRoadmapsResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-list-ai-roadmaps`,
        {
          currPage,
        },
      );

      if (error || !response) {
        toast.error(error?.message || 'Something went wrong');
        return;
      }

      const newRoadmaps = [...roadmaps, ...response.data];
      if (
        JSON.stringify(roadmaps) === JSON.stringify(response.data) ||
        JSON.stringify(roadmaps) === JSON.stringify(newRoadmaps)
      ) {
        return;
      }

      setRoadmaps(newRoadmaps);
      setCurrPage(response.currPage);
      setTotalPages(response.totalPages);
    },
    [currPage, roadmaps],
  );

  useEffect(() => {
    loadAIRoadmaps(currPage).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const hasMorePages = currPage < totalPages;

  return (
    <section className="container mx-auto py-3 sm:py-6">
      <div className="mb-6">
        <AIRoadmapAlert isListing />
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
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
              {hasMorePages && (
                <div className="my-5 flex items-center justify-center">
                  <button
                    onClick={() => {
                      setIsLoadingMore(true);
                      loadAIRoadmaps(currPage + 1).finally(() => {
                        setIsLoadingMore(false);
                      });
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-sm font-medium text-white shadow-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? (
                      <Loader2 className="h-4 w-4 animate-spin stroke-[2.5]" />
                    ) : (
                      <RefreshCcw className="h-4 w-4 stroke-[2.5]" />
                    )}
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
