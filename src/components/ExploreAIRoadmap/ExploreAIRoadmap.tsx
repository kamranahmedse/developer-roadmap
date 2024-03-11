import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { httpGet } from '../../lib/http';
import { getRelativeTimeString } from '../../lib/date';
import { Eye, Loader2, RefreshCcw } from 'lucide-react';
import { AIRoadmapAlert } from '../GenerateRoadmap/AIRoadmapAlert.tsx';
import { formatCommaNumber } from '../../lib/number.ts';

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
  const [roadmapsResponse, setRoadmapsResponse] =
    useState<ExploreRoadmapsResponse | null>(null);

  const loadAIRoadmaps = async (currPage: number) => {
    setIsLoading(true);
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

    setRoadmapsResponse(response);
  };

  const currPage = roadmapsResponse?.currPage || 1;
  const totalPages = roadmapsResponse?.totalPages || 1;
  const totalCount = roadmapsResponse?.totalCount || 0;

  const perPage = roadmapsResponse?.perPage || 0;
  const hasNextPage = currPage < totalPages;
  const hasPrevPage = currPage > 1;

  useEffect(() => {
    loadAIRoadmaps(currPage).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const roadmaps = roadmapsResponse?.data || [];

  const paginationBar = (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {hasPrevPage && (
          <button
            className="flex h-6 w-6 items-center justify-center rounded-md border disabled:cursor-not-allowed disabled:opacity-65"
            onClick={() => {
              loadAIRoadmaps(currPage - 1).finally(() => {
                setIsLoading(false);
              });
            }}
            disabled={isLoading}
          >
            &larr;
          </button>
        )}
        {hasNextPage && (
          <button
            className="flex h-6 w-6 items-center justify-center rounded-md border disabled:cursor-not-allowed disabled:opacity-65"
            onClick={() => {
              loadAIRoadmaps(currPage + 1).finally(() => {
                setIsLoading(false);
              });
            }}
            disabled={isLoading}
          >
            &rarr;
          </button>
        )}

        <p className="text-sm">
          Showing {formatCommaNumber((currPage - 1) * perPage)} to{' '}
          {formatCommaNumber((currPage - 1) * perPage + roadmaps.length)} of{' '}
          {formatCommaNumber(totalCount)} entries
        </p>
      </div>
      <div className="flex items-center text-sm">
        <p>
          Page {formatCommaNumber(currPage)} of {formatCommaNumber(totalPages)}
        </p>
      </div>
    </div>
  );

  return (
    <section className="container mx-auto py-3 sm:py-6">
      <div className="mb-6">
        <AIRoadmapAlert isListing />
      </div>

      {paginationBar}

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
              {paginationBar}
            </>
          )}
        </div>
      )}
    </section>
  );
}
