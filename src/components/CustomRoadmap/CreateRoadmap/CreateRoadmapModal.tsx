import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Modal } from '../../Modal';
import { useToast } from '../../../hooks/use-toast';
import { httpPost } from '../../../lib/http';
import { cn } from '../../../lib/classname';
import { useStore } from '@nanostores/react';
import {
  hideCreateRoadmapModal,
  isCreatingRoadmap,
} from '../../../stores/roadmap';

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

export interface RoadmapDocument {
  _id?: string;
  title: string;
  description?: string;
  creatorId: string;
  teamId?: string;
  type: AllowedCustomRoadmapType;
  visibility: AllowedRoadmapVisibility;
  nodes: any[];
  edges: any[];
  createdAt: Date;
  updatedAt: Date;
}

interface CreateRoadmapModalProps {}

export function CreateRoadmapModal(props: CreateRoadmapModalProps) {
  const $isCreatingRoadmap = useStore(isCreatingRoadmap);
  const titleRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<AllowedCustomRoadmapType>('role');
  const isInvalidDescription = description?.trim().length > 80;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim() === '' || isInvalidDescription) {
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpPost<RoadmapDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-create-roadmap`,
      {
        title,
        description,
        type,
        nodes: [],
        edges: [],
      }
    );

    if (error) {
      setIsLoading(false);
      toast.error(error?.message || 'Something went wrong, please try again');
      return;
    }

    toast.success('Roadmap created successfully');
    window.location.href = `${import.meta.env.PUBLIC_EDITOR_APP_URL}/${
      response?._id
    }`;
  }

  useEffect(() => {
    titleRef.current?.focus();
  }, [$isCreatingRoadmap]);

  if (!$isCreatingRoadmap) {
    return null;
  }

  return (
    <Modal onClose={hideCreateRoadmapModal} bodyClassName="p-4">
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
              className="block w-full rounded-md border border-gray-300 px-2.5 py-2 outline-none focus:border-black sm:text-sm"
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
                'block h-24 w-full resize-none rounded-md border border-gray-300 px-2.5 py-2 outline-none focus:border-black sm:text-sm',
                isInvalidDescription && 'border-red-300 bg-red-100'
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
        <div className="mt-4">
          <label
            htmlFor="type"
            className="block text-xs uppercase text-gray-400"
          >
            Type
          </label>
          <div className="mt-1">
            <select
              id="type"
              name="type"
              required
              className="block w-full rounded-md border border-gray-300 px-2.5 py-2 outline-none focus:border-black sm:text-sm"
              value={type}
              onChange={(e) =>
                setType(e.target.value as AllowedCustomRoadmapType)
              }
            >
              {allowedCustomRoadmapType.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)} Based Roadmap
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={hideCreateRoadmapModal}
            className="block h-9 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-black outline-none hover:border-gray-300 hover:bg-gray-50 focus:border-gray-300 focus:bg-gray-100"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="flex h-9 w-full items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white outline-none hover:bg-gray-800 focus:bg-gray-800"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Create'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
