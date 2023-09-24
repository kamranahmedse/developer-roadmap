import { useState } from 'react';
import { httpDelete } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import { ExternalLinkIcon, Plus } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import {
  CreateRoadmapModal,
  type RoadmapDocument,
} from './CreateRoadmap/CreateRoadmapModal';
import RoadmapIcon from '../../icons/roadmap.svg';

type PersonalRoadmapListType = {
  roadmaps: RoadmapDocument[];
  onDelete: (roadmapId: string) => void;
};

export function PersonalRoadmapList(props: PersonalRoadmapListType) {
  const { roadmaps: roadmapList, onDelete } = props;

  const toast = useToast();
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);

  async function deleteRoadmap(roadmapId: string) {
    const { response, error } = await httpDelete<RoadmapDocument[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-roadmap/${roadmapId}`
    );

    if (error || !response) {
      console.error(error);
      toast.error(error?.message || 'Something went wrong, please try again');
    }

    onDelete(roadmapId);
  }

  async function onRemove(roadmapId: string) {
    pageProgressMessage.set('Deleting roadmap');

    deleteRoadmap(roadmapId).finally(() => {
      pageProgressMessage.set('');
    });
  }

  if (roadmapList.length === 0) {
    return (
      <div className="flex flex-col items-center p-4 py-20">
        <img
          alt="roadmap"
          src={RoadmapIcon.src}
          className="mb-4 h-24 w-24 opacity-10"
        />
        <h3 className="mb-1 text-2xl font-bold text-gray-900">No roadmaps</h3>
        <p className="text-base text-gray-500">
          Create a roadmap to get started
        </p>

        <button
          className="mt-4 rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-900"
          onClick={() => setIsCreatingRoadmap(true)}
        >
          Add roadmap
        </button>
      </div>
    );
  }

  return (
    <div>
      {isCreatingRoadmap && (
        <CreateRoadmapModal onClose={() => setIsCreatingRoadmap(false)} />
      )}
      <div className="mb-3 flex items-center justify-between">
        <span className={'text-gray-400'}>
          {roadmapList.length} custom roadmap(s)
        </span>
        <button
          className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          onClick={() => setIsCreatingRoadmap(true)}
        >
          <Plus size={16} />
          Create Roadmap
        </button>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {roadmapList.map((roadmap) => {
          return (
            <CustomRoadmapItem
              key={roadmap._id!}
              roadmap={roadmap}
              onRemove={onRemove}
            />
          );
        })}
      </ul>
    </div>
  );
}

type CustomRoadmapItemType = {
  roadmap: RoadmapDocument;
  onRemove?: (roadmapId: string) => void;
};

function CustomRoadmapItem(props: CustomRoadmapItemType) {
  const { roadmap, onRemove } = props;

  const roadmapId = roadmap._id?.toString()!;
  const editLink = `${import.meta.env.PUBLIC_EDITOR_APP_URL}/${roadmapId}`;

  const [removingRoadmapId, setRemovingRoadmapId] = useState('');

  return (
    <li className="flex flex-col items-start rounded-md border border-gray-300">
      <div className={'w-full px-3 py-4'}>
        <a
          href={`/r?id=${roadmap._id}`}
          className="group mb-0.5 flex items-center justify-between text-base font-medium leading-none text-black"
          target={'_blank'}
        >
          {roadmap.title}

          <ExternalLinkIcon
            size={16}
            className="ml-2 opacity-20 transition-opacity group-hover:opacity-100"
          />
        </a>
      </div>

      <div className={'flex w-full justify-between px-3 pb-3 pt-2'}>
        <a
          href={editLink}
          className={
            'text-xs text-gray-500 underline hover:text-black focus:outline-none'
          }
        >
          Edit
        </a>

        {removingRoadmapId !== roadmap._id?.toString() && (
          <button
            type="button"
            className={
              'text-xs text-red-500 underline hover:text-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-red-500'
            }
            onClick={() => setRemovingRoadmapId(roadmapId)}
          >
            Delete
          </button>
        )}

        {removingRoadmapId === roadmapId && (
          <span className="text-xs">
            Are you sure?{' '}
            <button
              onClick={() => onRemove?.(roadmapId)}
              className="mx-0.5 text-red-500 underline underline-offset-1"
            >
              Yes
            </button>{' '}
            <button
              onClick={() => setRemovingRoadmapId('')}
              className="text-red-500 underline underline-offset-1"
            >
              No
            </button>
          </span>
        )}
      </div>
    </li>
  );
}
