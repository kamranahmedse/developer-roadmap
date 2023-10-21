import { CircleSlash, PenSquare, Shapes } from 'lucide-react';
import { cn } from '../../lib/classname';

type EmptyRoadmapProps = {
  roadmapId: string;
  canManage: boolean;
  className?: string;
};

export function EmptyRoadmap(props: EmptyRoadmapProps) {
  const { roadmapId, canManage, className } = props;
  const editUrl = `${import.meta.env.PUBLIC_EDITOR_APP_URL}/${roadmapId}`;

  return (
    <div className={cn('flex h-full items-center justify-center', className)}>
      <div className="flex flex-col items-center">
        <CircleSlash className="mx-auto h-20 w-20 text-gray-400" />
        <h3 className="mt-2">This roadmap is currently empty.</h3>

        {canManage && (
          <a
            href={editUrl}
            className="mt-4 flex items-center rounded-md bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
          >
            <Shapes className="mr-2 inline-block h-4 w-4" />
            Edit Roadmap
          </a>
        )}
      </div>
    </div>
  );
}
