import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { UserResourceProgressDocument } from './UserActivities';

dayjs.extend(relativeTime);

export function LearningProgress({
  resource,
}: {
  resource: UserResourceProgressDocument;
}) {
  return (
    <div className={`rounded border border-gray-200 p-2`}>
      <div className="flex items-center justify-between">
        <h4 className="truncate font-medium">{resource.resourceId}</h4>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="whitespace-nowrap text-xs leading-none">
          {resource.done.length} / {resource.totalGroupCount}
        </span>
        <p className="text-xs text-gray-400">
          {dayjs().to(dayjs(new Date(resource.updatedAt)))}
        </p>
      </div>
      {/* <div className="mt-2 flex items-center gap-2">
        <div className="h-2.5 w-full rounded-full bg-gray-200">
          <div
            className="h-2.5 rounded-full bg-blue-600"
            style={{
              width: `${
                (resource.done.length / resource.totalGroupCount) * 100
              }%`,
            }}
          />
        </div>
        <span className="whitespace-nowrap text-xs leading-none">
          {resource.done.length} / {resource.totalGroupCount}
        </span>
      </div> */}
    </div>
  );
}
