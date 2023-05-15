import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { httpPost } from '../../lib/http';
import type { UserResourceProgressDocument } from './UserActivities';
import XIcon from '../../icons/close.svg';
import { pageLoadingMessage } from '../../stores/page';

dayjs.extend(relativeTime);

export function LearningProgress({
  resource,
}: {
  resource: UserResourceProgressDocument;
}) {
  const handleClearProgress = async () => {
    pageLoadingMessage.set('Clearing Progress');
    const { response, error } = await httpPost<{ status: 'ok' }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-clear-resource-progress`,
      {
        resourceId: resource.resourceId,
        resourceType: resource.resourceType,
      }
    );

    if (error) {
      console.log(error);
      return;
    }

    window.location.reload();
  };
  return (
    <div className={`relative rounded p-2 ring-1 ring-gray-200`}>
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
      <div className="absolute inset-x-1 -top-px z-10 flex items-center gap-2">
        <div className="h-px w-full rounded-full">
          <div
            className="h-px rounded-full bg-blue-600"
            style={{
              width: `${
                (resource.done.length / resource.totalGroupCount) * 100
              }%`,
            }}
          />
        </div>
      </div>
      <button
        onClick={handleClearProgress}
        className="absolute right-1.5 top-1.5 inline-flex items-center rounded-lg bg-transparent p-1 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
      >
        <img src={XIcon} alt="close" className="h-4 w-4" />
      </button>
    </div>
  );
}

export function LearningProgressSkeleton() {
  return (
    <div className={`relative rounded p-2 ring-1 ring-gray-200`}>
      <div className="flex items-center justify-between">
        <div className="h-6 w-1/2 rounded bg-gray-300" />
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="h-4 w-1/4 rounded bg-gray-300" />
        <div className="h-4 w-1/4 rounded bg-gray-300" />
      </div>
      <div className="absolute inset-x-1 -top-px z-10 flex items-center gap-2">
        <div className="h-px w-full rounded-full">
          <div className="h-px rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
