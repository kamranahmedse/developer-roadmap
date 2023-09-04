import { useEffect, useRef, useState } from 'react';
import { httpPost } from '../../lib/http';
import { Loader2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { type RoadmapDocument } from './CustomRoadmap';
import { cn } from '../../lib/classname';

type CreateRoadmapFormProps = {
  selectedTeamId?: string;
  canCancel?: boolean;
  onClose?: () => void;
};

export function CreateRoadmapForm(props: CreateRoadmapFormProps) {
  const { selectedTeamId, canCancel, onClose } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const isInvalidDescription = description?.trim().length > 80;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim() === '' || isInvalidDescription) {
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpPost<RoadmapDocument>(
      '/v1-create-roadmap',
      {
        title,
        description,
        ...(selectedTeamId && { teamId: selectedTeamId }),
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
  }, []);

  return (
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
      <div className="mt-4 flex gap-2">
        {canCancel && (
          <button
            onClick={onClose}
            className="block h-9 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-black outline-none hover:border-gray-300 hover:bg-gray-50 focus:border-gray-300 focus:bg-gray-100"
          >
            Cancel
          </button>
        )}
        <button
          disabled={isLoading}
          type="submit"
          className="flex h-9 w-full items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white outline-none hover:bg-gray-800 focus:bg-gray-800"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            'Create Roadmap'
          )}
        </button>
      </div>
    </form>
  );
}
