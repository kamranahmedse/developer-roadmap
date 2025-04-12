import { httpDelete } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import {
  ExternalLink,
  Shapes,
  type LucideIcon,
  Globe,
  LockIcon,
  Users,
  PenSquare,
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import {
  type AllowedRoadmapVisibility,
  type RoadmapDocument,
} from './CreateRoadmap/CreateRoadmapModal';
import { PersonalRoadmapActionDropdown } from './PersonalRoadmapActionDropdown';
import type { GetRoadmapListResponse } from './RoadmapListPage';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { ShareOptionsModal } from '../ShareOptions/ShareOptionsModal';
import { RoadmapIcon } from '../ReactIcons/RoadmapIcon.tsx';

type PersonalRoadmapListType = {
  roadmaps: GetRoadmapListResponse['personalRoadmaps'];
  onDelete: (roadmapId: string) => void;
  setAllRoadmaps: Dispatch<SetStateAction<GetRoadmapListResponse>>;
};

export function PersonalRoadmapList(props: PersonalRoadmapListType) {
  const { roadmaps: roadmapList, onDelete, setAllRoadmaps } = props;

  const toast = useToast();

  const [selectedRoadmap, setSelectedRoadmap] = useState<
    GetRoadmapListResponse['personalRoadmaps'][number] | null
  >(null);

  async function deleteRoadmap(roadmapId: string) {
    const { response, error } = await httpDelete<RoadmapDocument[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-roadmap/${roadmapId}`,
    );

    if (error || !response) {
      console.error(error);
      toast.error(error?.message || 'Something went wrong, please try again');

      return;
    }

    toast.success('Roadmap deleted');
    onDelete(roadmapId);
  }

  async function onRemove(roadmapId: string) {
    pageProgressMessage.set('Deleting roadmap');

    deleteRoadmap(roadmapId).finally(() => {
      pageProgressMessage.set('');
    });
  }

  const shareSettingsModal = selectedRoadmap && (
    <ShareOptionsModal
      roadmapSlug={selectedRoadmap?.slug}
      isDiscoverable={selectedRoadmap.isDiscoverable}
      description={selectedRoadmap.description}
      visibility={selectedRoadmap.visibility}
      sharedFriendIds={selectedRoadmap.sharedFriendIds}
      sharedTeamMemberIds={selectedRoadmap.sharedTeamMemberIds}
      roadmapId={selectedRoadmap._id!}
      onClose={() => setSelectedRoadmap(null)}
      onShareSettingsUpdate={(settings) => {
        setAllRoadmaps((prev) => {
          return {
            ...prev,
            personalRoadmaps: prev.personalRoadmaps.map((roadmap) => {
              if (roadmap._id === selectedRoadmap._id) {
                return {
                  ...roadmap,
                  ...settings,
                };
              }

              return roadmap;
            }),
          };
        });
      }}
    />
  );

  if (roadmapList.length === 0) {
    return (
      <div className="flex flex-col items-center p-4 py-20">
        <RoadmapIcon className="mb-4 h-24 w-24 opacity-10" />

        <h3 className="mb-1 text-2xl font-bold text-gray-900">No roadmaps</h3>
        <p className="text-base text-gray-500">
          Create a roadmap to get started
        </p>
      </div>
    );
  }

  return (
    <div>
      {shareSettingsModal}
      <div className="mb-3 flex items-center justify-between">
        <span className={'text-sm text-gray-400'}>
          {roadmapList.length} custom roadmap(s)
        </span>
      </div>
      <ul className="flex flex-col divide-y rounded-md border">
        {roadmapList.map((roadmap) => {
          return (
            <CustomRoadmapItem
              key={roadmap._id!}
              roadmap={roadmap}
              onRemove={onRemove}
              setSelectedRoadmap={setSelectedRoadmap}
            />
          );
        })}
      </ul>
    </div>
  );
}

type CustomRoadmapItemProps = {
  roadmap: GetRoadmapListResponse['personalRoadmaps'][number];
  onRemove: (roadmapId: string) => Promise<void>;
  setSelectedRoadmap: (
    roadmap: GetRoadmapListResponse['personalRoadmaps'][number] | null,
  ) => void;
};

function CustomRoadmapItem(props: CustomRoadmapItemProps) {
  const { roadmap, onRemove, setSelectedRoadmap } = props;

  const editorLink = `${import.meta.env.PUBLIC_EDITOR_APP_URL}/${roadmap._id}`;

  return (
    <li
      className="grid grid-cols-1 p-2.5 sm:grid-cols-[auto_172px]"
      key={roadmap._id!}
    >
      <div className="mb-3 grid grid-cols-1 sm:mb-0">
        <p className="mb-1.5 truncate text-base font-medium leading-tight text-black">
          {roadmap.title}
        </p>
        <span className="flex items-center text-xs leading-none text-gray-400">
          <VisibilityBadge
            visibility={roadmap.visibility!}
            sharedFriendIds={roadmap.sharedFriendIds}
          />
          <span className="mx-2 font-semibold">&middot;</span>
          <Shapes size={16} className="mr-1 inline-block h-4 w-4" />
          {roadmap.topics} topic
        </span>
      </div>
      <div className="mr-1 flex items-center justify-start sm:justify-end">
        <PersonalRoadmapActionDropdown
          onUpdateSharing={() => {
            setSelectedRoadmap(roadmap);
          }}
          onCustomize={() => {
            window.open(editorLink, '_blank');
          }}
          onDelete={() => {
            if (confirm('Are you sure you want to remove this roadmap?')) {
              onRemove(roadmap._id!).finally(() => {});
            }
          }}
        />

        <a
          href={editorLink}
          className={
            'ml-2 flex items-center gap-2 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-black hover:bg-gray-50 focus:outline-hidden'
          }
          target={'_blank'}
        >
          <PenSquare className="inline-block h-4 w-4" />
          Edit
        </a>
        <a
          href={`/r/${roadmap?.slug}`}
          className={
            'ml-2 flex items-center gap-2 rounded-md border border-blue-400 bg-white px-2 py-1.5 text-xs text-blue-600 hover:bg-blue-50 focus:outline-hidden'
          }
          target={'_blank'}
        >
          <ExternalLink className="inline-block h-4 w-4" />
          Visit
        </a>
      </div>
    </li>
  );
}

type VisibilityLabelProps = {
  visibility: AllowedRoadmapVisibility;
  sharedFriendIds?: string[];
};

const visibilityDetails: Record<
  AllowedRoadmapVisibility,
  {
    icon: LucideIcon;
    label: string;
  }
> = {
  public: {
    icon: Globe,
    label: 'Public',
  },
  me: {
    icon: LockIcon,
    label: 'Only me',
  },
  team: {
    icon: Users,
    label: 'Team Member(s)',
  },
  friends: {
    icon: Users,
    label: 'Friend(s)',
  },
} as const;

function VisibilityBadge(props: VisibilityLabelProps) {
  const { visibility, sharedFriendIds = [] } = props;

  const { label, icon: Icon } = visibilityDetails[visibility];

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-normal`}
    >
      <Icon className="inline-block h-3 w-3" />
      <div className="flex items-center">
        {visibility === 'friends' && sharedFriendIds?.length > 0 && (
          <span className="mr-1">{sharedFriendIds.length}</span>
        )}
        {label}
      </div>
    </span>
  );
}
