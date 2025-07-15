import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { Check, Copy, Loader2 } from 'lucide-react';

import { Modal } from '../Modal';
import type { AllowedRoadmapVisibility } from './CreateRoadmap/CreateRoadmapModal';
import { cn } from '../../lib/classname';
import { httpPatch } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { useCopyText } from '../../hooks/use-copy-text';
import { currentRoadmap, isCurrentRoadmapPersonal } from '../../stores/roadmap';

type ShareRoadmapModalProps = {
  onClose: () => void;
};

export const allowedVisibilityLabels: {
  id: AllowedRoadmapVisibility;
  label: string;
}[] = [
  {
    id: 'me',
    label: 'Only visible to me',
  },
  {
    id: 'public',
    label: 'Anyone with the link',
  },
  {
    id: 'team',
    label: 'Visible to team members',
  },
  {
    id: 'friends',
    label: 'Only friends can view',
  },
];

export function ShareRoadmapModal(props: ShareRoadmapModalProps) {
  const { onClose } = props;

  const toast = useToast();
  const $currentRoadmap = useStore(currentRoadmap);
  const $isCurrentRoadmapPersonal = useStore(isCurrentRoadmapPersonal);
  const roadmapId = $currentRoadmap?._id!;

  const { copyText, isCopied } = useCopyText();
  const [visibility, setVisibility] = useState($currentRoadmap?.visibility);
  const [isLoading, setIsLoading] = useState(false);

  async function updateVisibility(newVisibility: AllowedRoadmapVisibility) {
    setIsLoading(true);
    const { response, error } = await httpPatch(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-roadmap-visibility/${
        $currentRoadmap?._id
      }`,
      {
        visibility: newVisibility,
      }
    );

    if (error) {
      console.error(error);
      toast.error(error?.message || 'Something went wrong, please try again');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    toast.success('Visibility updated');
    setVisibility(newVisibility);
    currentRoadmap.set({
      ...$currentRoadmap!,
      visibility: newVisibility,
    });
  }

  function handleCopy() {
    const isDev = import.meta.env.DEV;
    const url = new URL(
      isDev ? 'http://localhost:3000/r' : 'https://roadmap.sh/r'
    );
    url.searchParams.set('id', roadmapId);
    copyText(url.toString());
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-4 pb-0">
        <h1 className="text-lg font-medium leading-5 text-gray-900">
          Updating {$currentRoadmap?.title}
        </h1>
      </div>

      <ul className="mt-4 border-t">
        {allowedVisibilityLabels.map((v) => {
          if (v.id === 'team' && $isCurrentRoadmapPersonal) {
            return null;
          } else if (v.id === 'friends' && !$isCurrentRoadmapPersonal) {
            return null;
          }

          return (
            <li key={v.id}>
              <button
                disabled={v.id === visibility || isLoading}
                key={v.id}
                className={cn(
                  'relative flex w-full items-center border-b p-2.5 px-4 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 disabled:cursor-not-allowed',
                  v.id === visibility &&
                    'bg-gray-900 text-white hover:bg-gray-900 hover:text-white'
                )}
                onClick={() => updateVisibility(v.id)}
              >
                {v.label}

                {v.id === visibility && (
                  <span className="absolute bottom-0 right-0 top-0 flex w-8 items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between p-4">
        <button
          disabled={isLoading}
          className="flex h-9 items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-black outline-hidden hover:border-gray-300 hover:bg-gray-50 focus:border-gray-300 focus:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={onClose}
        >
          {isLoading ? (
            <>
              <Loader2 size={14} className="mr-2 animate-spin stroke-[2.5]" />
              Saving
            </>
          ) : (
            'Cancel'
          )}
        </button>
        <button
          className="flex h-9 items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white outline-hidden hover:bg-gray-800 focus:bg-gray-800"
          onClick={handleCopy}
        >
          {isCopied ? (
            <>
              <Check size={14} className="mr-2 stroke-[2.5]" />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} className="mr-2 stroke-[2.5]" />
              Copy Link
            </>
          )}
        </button>
      </div>
    </Modal>
  );
}
