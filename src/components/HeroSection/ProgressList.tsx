import type { UserProgressResponse } from './FavoriteRoadmaps';
import { CheckIcon } from './CheckIcon';

type ProgressListProps = {
  progress: UserProgressResponse;
};

export function ProgressList(props: ProgressListProps) {
  const { progress } = props;

  return (
    <div className="relative py-7">
      <p className="mb-4 flex items-center text-center text-sm text-gray-400">
        <CheckIcon additionalClasses={'mr-1.5 w-[14px] h-[14px]'} />
        Your favorite roadmaps and tracked progress.
      </p>

      <div className="grid grid-cols-3 gap-2">
        {progress.map((resource) => {
          const url =
            resource.resourceType === 'roadmap'
              ? `/${resource.resourceId}`
              : `/best-practices/${resource.resourceId}`;

          const percentageDone =
            ((resource.skipped + resource.done) / resource.total) * 100;

          return (
            <a
              href={url}
              className="relative flex flex-col rounded-md border border-slate-800 bg-slate-900 p-3 text-sm text-slate-400 hover:border-slate-600 hover:text-slate-300 overflow-hidden"
            >
              <span className='relative z-20'>{resource.resourceTitle}</span>

              <span
                class="absolute bottom-0 left-0 top-0 z-10 bg-[#172a3a]"
                style={{ width: `${percentageDone}%` }}
              ></span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
