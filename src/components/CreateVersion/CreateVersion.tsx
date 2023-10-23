import { useState } from 'react';
import { httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { isLoggedIn } from '../../lib/jwt';
import { Layers2, Loader2 } from 'lucide-react';

type CreateVersionProps = {
  roadmapId: string;
};

export function CreateVersion(props: CreateVersionProps) {
  const { roadmapId } = props;

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function createVersion() {
    if (isLoading || !roadmapId || !isLoggedIn()) {
      return;
    }
    setIsLoading(true);
    const { response, error } = await httpPost<{ roadmapId: string }>(
      `${import.meta.env.PUBLIC_API_URL}/v1-create-version/${roadmapId}`,
      {},
    );

    if (error || !response) {
      setIsLoading(false);
      toast.error(error?.message || 'Failed to create version');
      return;
    }

    const roadmapEditorUrl = `${
      import.meta.env.PUBLIC_EDITOR_APP_URL
    }/${response?.roadmapId}`;

    window.open(roadmapEditorUrl, '_blank');
  }

  return (
    <button
      disabled={isLoading}
      className="inline-flex h-full items-center justify-center rounded-md bg-gray-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400 sm:text-sm"
      onClick={createVersion}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-3 w-3 animate-spin stroke-[2.5] text-white max-md:mr-0" />
      ) : (
        <Layers2 className="mr-2 h-3 w-3 stroke-[2.5] text-white max-md:mr-0" />
      )}
      <span className="max-md:hidden">Create Version</span>
    </button>
  );
}
