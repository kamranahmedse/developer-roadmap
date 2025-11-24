import {
  type FormEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Loader2 } from 'lucide-react';
import { Modal } from '../../Modal';
import { useToast } from '../../../hooks/use-toast';
import { httpPost } from '../../../lib/http';
import { cn } from '../../../lib/classname';

export const allowedRoadmapVisibility = [
  'me',
  'friends',
  'team',
  'public',
] as const;
export type AllowedRoadmapVisibility =
  (typeof allowedRoadmapVisibility)[number];
export const allowedCustomRoadmapType = ['role', 'skill'] as const;
export type AllowedCustomRoadmapType =
  (typeof allowedCustomRoadmapType)[number];

export const allowedShowcaseStatus = [
  'submitted',
  'approved',
  'rejected',
  'rejected_with_reason',
] as const;
export type AllowedShowcaseStatus = (typeof allowedShowcaseStatus)[number];

export interface RoadmapDocument {
  _id: string;
  title: string;
  description?: string;
  slug?: string;
  creatorId: string;
  aiRoadmapId?: string;
  teamId?: string;
  topicCount: number;
  visibility: AllowedRoadmapVisibility;
  sharedFriendIds?: string[];
  sharedTeamMemberIds?: string[];
  feedbacks?: {
    userId: string;
    email: string;
    feedback: string;
  }[];
  metadata?: {
    originalRoadmapId?: string;
    defaultRoadmapId?: string;
  };
  nodes: any[];
  edges: any[];

  isDiscoverable?: boolean;
  ratings: {
    average: number;
    totalCount: number;
    breakdown: {
      [key: number]: number;
    };
  };

  showcaseStatus?: AllowedShowcaseStatus;
  showcaseRejectedReason?: string;
  showcaseRejectedAt?: Date;
  showcaseSubmittedAt?: Date;
  showcaseApprovedAt?: Date;

  hasMigratedContent?: boolean;

  createdAt: Date;
  updatedAt: Date;
}

interface CreateRoadmapModalProps {
  onClose: () => void;
  onCreated?: (roadmap: RoadmapDocument) => void;
  teamId?: string;
  visibility?: AllowedRoadmapVisibility;
}

export function CreateRoadmapModal(props: CreateRoadmapModalProps) {
  const { onClose, onCreated, teamId } = props;

  const titleRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const isInvalidDescription = description?.trim().length > 80;

  async function handleSubmit(
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
    redirect: boolean = true,
  ) {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    if (title.trim() === '' || isInvalidDescription) {
      toast.error('Please fill all the fields');
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpPost<RoadmapDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-create-roadmap`,
      {
        title,
        description,
        ...(teamId && {
          teamId,
        }),
        nodes: [],
        edges: [],
      },
    );

    if (error) {
      setIsLoading(false);
      toast.error(error?.message || 'Something went wrong, please try again');
      return;
    }

    toast.success('Roadmap created successfully');
    if (redirect) {
      window.location.href = `${
        import.meta.env.PUBLIC_EDITOR_APP_URL
      }/${response?._id}`;
      return;
    }

    if (onCreated) {
      onCreated(response as RoadmapDocument);
      return;
    }

    onClose();

    setTitle('');
    setDescription('');
    setIsLoading(false);
  }

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <Modal
      onClose={onClose}
      bodyClassName="p-4"
      wrapperClassName={cn(teamId && 'max-w-lg')}
    >
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900">Create Roadmap</h2>
        <p className="mt-1 text-sm text-gray-500">
          Add a title and description to your roadmap.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label
            htmlFor="title"
            className="block text-xs uppercase text-gray-400"
          >
            Roadmap Title
          </label>
          <div className="mt-1">
            <input
              ref={titleRef}
              type="text"
              name="title"
              id="title"
              required
              className="block w-full rounded-md border border-gray-300 px-2.5 py-2 text-black outline-hidden focus:border-black sm:text-sm"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="description"
            className="block text-xs uppercase text-gray-400"
          >
            Description
          </label>
          <div className="relative mt-1">
            <textarea
              id="description"
              name="description"
              required
              className={cn(
                'block h-24 w-full resize-none rounded-md border border-gray-300 px-2.5 py-2 text-black outline-hidden focus:border-black sm:text-sm',
                isInvalidDescription && 'border-red-300 bg-red-100',
              )}
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {description.length}/80
            </div>
          </div>
        </div>

        <div
          className={cn('mt-4 flex justify-between gap-2', teamId && 'mt-8')}
        >
          <button
            onClick={onClose}
            type="button"
            className={cn(
              'block h-9 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-black outline-hidden hover:border-gray-300 hover:bg-gray-50 focus:border-gray-300 focus:bg-gray-100',
              !teamId && 'w-full',
            )}
          >
            Cancel
          </button>

          <div className={cn('flex items-center gap-2', !teamId && 'w-full')}>
            {teamId && !isLoading && (
              <button
                disabled={isLoading}
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                className="flex h-9 items-center justify-center rounded-md border border-black bg-white px-4 py-2 text-sm font-medium text-black outline-hidden hover:bg-black hover:text-white focus:bg-black focus:text-white"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  'Save as Placeholder'
                )}
              </button>
            )}

            <button
              disabled={isLoading}
              type="submit"
              className={cn(
                'flex h-9 items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white outline-hidden hover:bg-gray-800 focus:bg-gray-800',
                teamId ? 'hidden sm:flex' : 'w-full',
              )}
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : teamId ? (
                'Continue to Editor'
              ) : (
                'Create'
              )}
            </button>
          </div>
        </div>
        {teamId && (
          <>
            <p className="mt-4 hidden rounded-md border border-orange-200 bg-orange-50 p-2.5 text-sm text-orange-600 sm:block">
              Preparing the roadmap might take some time, feel free to save it
              as a placeholder and anyone with the role <strong>admin</strong>{' '}
              or <strong>manager</strong> can prepare it later.
            </p>
            <p className="mt-4 rounded-md border border-orange-200 bg-orange-50 p-2.5 text-sm text-orange-600 sm:hidden">
              Create a placeholder now and prepare it later.
            </p>
          </>
        )}
      </form>
    </Modal>
  );
}
