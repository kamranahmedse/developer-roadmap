import type { AIRoadmapDocument } from './ExploreAIRoadmap.tsx';
import { Eye } from 'lucide-react';
import { getRelativeTimeString } from '../../lib/date.ts';

export type ExploreRoadmapsResponse = {
  data: AIRoadmapDocument[];
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

type AIRoadmapsListProps = {
  response: ExploreRoadmapsResponse | null;
};

export function AIRoadmapsList(props: AIRoadmapsListProps) {
  const { response } = props;

  if (!response) {
    return null;
  }

  const roadmaps = response.data || [];

  return (
    <ul className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {roadmaps.map((roadmap) => {
        const roadmapLink = `/ai-roadmaps/${roadmap.slug}`;

        return (
          <a
            key={roadmap._id}
            href={roadmapLink}
            className="flex min-h-[95px] flex-col rounded-md border transition-colors hover:bg-gray-100"
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
  );
}
