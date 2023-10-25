import { useEffect, useState } from 'react';
import { httpGet, httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { isLoggedIn } from '../../lib/jwt';
import { GitFork, Layers2, Loader2, Map } from 'lucide-react';
import { showLoginPopup } from '../../lib/popup';
import type { RoadmapDocument } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal.tsx';

type CreateVersionProps = {
  roadmapId: string;
};

export function CreateVersion(props: CreateVersionProps) {
  const { roadmapId } = props;

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [userVersion, setUserVersion] = useState<RoadmapDocument>();

  async function loadMyVersion() {
    if (!isLoggedIn()) {
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpGet<RoadmapDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-my-version/${roadmapId}`,
      {},
    );

    if (error || !response) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setUserVersion(response);
  }

  useEffect(() => {
    loadMyVersion().finally(() => {
      setIsLoading(false);
    });
  }, []);

  async function createVersion() {
    if (isCreating || !roadmapId) {
      return;
    }

    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    setIsCreating(true);
    const { response, error } = await httpPost<{ roadmapId: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-create-version/${roadmapId}`,
      {},
    );

    if (error || !response) {
      setIsCreating(false);
      toast.error(error?.message || 'Failed to create version');
      return;
    }

    const roadmapEditorUrl = `${
      import.meta.env.PUBLIC_EDITOR_APP_URL
    }/${response?.roadmapId}`;

    window.open(roadmapEditorUrl, '_blank');
  }

  if (isLoading) {
    return (
      <div className="h-[30px] w-[206px] animate-pulse rounded-md bg-gray-300"></div>
    );
  }

  if (!isLoading && userVersion?._id) {
    return (
      <div className={'flex items-center'}>
        <a
          href={`/r?id=${userVersion._id}`}
          className="flex items-center rounded-md border border-blue-400 bg-gray-50 px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:hover:bg-gray-100 max-sm:hidden sm:text-sm"
        >
          <Map size="15px" className="mr-1.5" />
          Visit your own version
        </a>
      </div>
    );
  }

  if (isConfirming) {
    return (
      <p className="flex h-[30px] items-center text-sm text-red-500">
        Create and edit a custom roadmap from this?
        <button
          onClick={() => {
            setIsConfirming(false);
            createVersion().finally(() => null);
          }}
          className="ml-2 font-semibold underline underline-offset-2"
        >
          Yes
        </button>
        <span className="text-xs">&nbsp;/&nbsp;</span>
        <button
          className="font-semibold underline underline-offset-2"
          onClick={() => setIsConfirming(false)}
        >
          No
        </button>
      </p>
    );
  }

  return (
    <button
      disabled={isCreating}
      className="flex items-center justify-center rounded-md border border-gray-300 bg-gray-50 px-2.5 py-1 text-xs font-medium text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:hover:bg-gray-100 max-sm:hidden sm:text-sm"
      onClick={() => {
        if (!isLoggedIn()) {
          showLoginPopup();
          return;
        }

        setIsConfirming(true);
      }}
    >
      {isCreating ? (
        <>
          <Loader2 className="mr-2 h-3 w-3 animate-spin stroke-[2.5]" />
          Please wait ..
        </>
      ) : (
        <>
          <GitFork className="mr-1.5" size="16px" />
          Create your own Version
        </>
      )}
    </button>
  );
}
