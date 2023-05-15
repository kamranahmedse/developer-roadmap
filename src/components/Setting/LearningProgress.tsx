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
        <div className="flex items-center gap-2">
          <h4 className="truncate font-medium">{resource.resourceId}</h4>
          <span
            className={`max-w-full truncate rounded border p-1 text-[10px] leading-none ${
              resource.resourceType === 'roadmap'
                ? 'border-indigo-300 bg-indigo-100 text-indigo-800'
                : 'border-pink-300 bg-pink-100 text-pink-800'
            }`}
          >
            {resource.resourceType}
          </span>
        </div>
        {/* Humanize time */}
        <p className="text-xs text-gray-400">
          {dayjs().to(dayjs(new Date(resource.updatedAt)))}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-2.5 w-full rounded-full bg-gray-200">
          <div
            className="h-2.5 rounded-full bg-blue-600"
            style={{
              width: `${0.4 * 100}%`,
            }}
          />
        </div>
        <span className="whitespace-nowrap text-xs leading-none">40 / 100</span>
      </div>
    </div>
  );
}
