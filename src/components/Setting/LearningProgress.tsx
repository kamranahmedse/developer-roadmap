import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { httpPost } from '../../lib/http';
import type { UserResourceProgressDocument } from './UserActivities';
import XIcon from '../../icons/close.svg';

dayjs.extend(relativeTime);

export function LearningProgress({
  resource,
}: {
  resource: UserResourceProgressDocument;
}) {
  const handleClearProgress = async () => {
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
    <div className={`rounded border border-gray-200 p-2 relative`}>
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
      <button onClick={handleClearProgress} className="absolute right-1.5 top-1.5 inline-flex items-center rounded-lg bg-transparent p-1 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
        <img src={XIcon} alt="close" className="h-4 w-4" />
      </button>
    </div>
  );
}
