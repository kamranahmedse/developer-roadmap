import { Shapes } from 'lucide-react';
import type { ListShowcaseRoadmapResponse } from '../../api/roadmap';
import { Pagination } from '../Pagination/Pagination';
import { SearchRoadmap } from './SearchRoadmap';
import { EmptyDiscoverRoadmaps } from './EmptyDiscoverRoadmaps';

type DiscoverRoadmapsProps = {
  searchParams: string;
  roadmapsResponse: ListShowcaseRoadmapResponse;
};

export function DiscoverRoadmaps(props: DiscoverRoadmapsProps) {
  const { roadmapsResponse, searchParams: defaultSearchparams } = props;

  const roadmaps = roadmapsResponse?.data || [];

  const searchParams = new URLSearchParams(defaultSearchparams);
  const titleQuery = searchParams.get('q') || '';

  return (
    <section className="container mx-auto py-3 sm:py-6">
      <SearchRoadmap
        total={roadmapsResponse?.totalCount || 0}
        value={titleQuery}
      />

      {roadmaps.length === 0 && <EmptyDiscoverRoadmaps />}
      {roadmaps.length > 0 && (
        <>
          <ul className="mb-4 grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {roadmaps.map((roadmap) => {
              const roadmapLink = `/r/${roadmap.slug}`;
              return (
                <li key={roadmap._id} className="h-full">
                  <a
                    key={roadmap._id}
                    href={roadmapLink}
                    className="flex h-full flex-col rounded-md border transition-colors hover:bg-gray-100"
                    target={'_blank'}
                  >
                    <div className="grow">
                      <h2 className="mt-2.5 px-2.5 text-base font-medium leading-tight">
                        {roadmap.title}
                      </h2>
                      <p className="my-2.5 px-2.5 text-sm text-gray-500">
                        {roadmap.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 px-2.5 py-2">
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Shapes size={15} className="inline-block" />
                        {Intl.NumberFormat('en-US', {
                          notation: 'compact',
                        }).format(roadmap.topicCount)}{' '}
                        topics
                      </span>
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
              const newSearchParams = new URLSearchParams();
              if (titleQuery) {
                newSearchParams.set('q', titleQuery);
              }

              newSearchParams.set('currPage', page.toString());
              window.location.href = `/discover?${newSearchParams.toString()}`;
            }}
          />
        </>
      )}
    </section>
  );
}
