import { Calendar } from 'lucide-react';
import { cn } from '../../lib/classname';
import type { ResourceType } from '../../lib/resource-progress';
import { ScheduleEventModal } from './ScheduleEventModal';
import { useState } from 'react';

type ScheduleButtonProps = {
  resourceId: string;
  resourceType: ResourceType;
  resourceTitle: string;
};

export function ScheduleButton(props: ScheduleButtonProps) {
  const { resourceId, resourceType, resourceTitle } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <ScheduleEventModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          roadmapId={resourceId}
        />
      )}

      <button
        className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-300 sm:text-sm"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <Calendar className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">Schedule Learning Time</span>
      </button>
    </>
  );
}
