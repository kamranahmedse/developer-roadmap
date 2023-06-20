import type { UserProgressResponse } from './FavoriteRoadmaps';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import { MarkFavorite } from '../FeaturedItems/MarkFavorite';
import { Spinner } from '../ReactIcons/Spinner';

type ProgressListProps = {
  progress: UserProgressResponse;
  isLoading?: boolean;
};

export function ProgressList(props: ProgressListProps) {
  const { progress, isLoading = false } = props;

  return (
    <div className="relative pb-12 pt-4 sm:pt-7">
      <p className="mb-4 flex items-center text-sm text-gray-400">
        {!isLoading && (
          <CheckIcon additionalClasses={'mr-1.5 w-[14px] h-[14px]'} />
        )}
        {isLoading && (
          <span className="mr-1.5">
            <Spinner />
          </span>
        )}
        Your progress and favorite roadmaps.
      </p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {progress.map((resource) => {
          const url =
            resource.resourceType === 'roadmap'
              ? `/${resource.resourceId}`
              : `/best-practices/${resource.resourceId}`;

          const percentageDone =
            ((resource.skipped + resource.done) / resource.total) * 100;

          return (
            <a
              key={resource.resourceId}
              href={url}
              className="relative flex flex-col overflow-hidden rounded-md border border-slate-800 bg-slate-900 p-3 text-sm text-slate-400 hover:border-slate-600 hover:text-slate-300"
            >
              <span className="relative z-20">{resource.resourceTitle}</span>

              <span
                class="absolute bottom-0 left-0 top-0 z-10 bg-[#172a3a]"
                style={{ width: `${percentageDone}%` }}
              ></span>
              <MarkFavorite
                resourceId={resource.resourceId}
                resourceType={resource.resourceType}
                favorite={resource.isFavorite}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
