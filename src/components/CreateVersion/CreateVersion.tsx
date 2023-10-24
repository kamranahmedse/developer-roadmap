import { useState } from 'react';
import { httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { isLoggedIn } from '../../lib/jwt';
import { Layers2, Loader2 } from 'lucide-react';
import { showLoginPopup } from '../../lib/popup';

type CreateVersionProps = {
  roadmapId: string;
};

export function CreateVersion(props: CreateVersionProps) {
  const { roadmapId } = props;

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function createVersion() {
    if (isLoading || !roadmapId) {
      return;
    }

    if (!isLoggedIn()) {
      showLoginPopup();
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

    setIsLoading(false);
    window.open(roadmapEditorUrl, '_blank');
  }

  return (
    <button
      disabled={isLoading}
      className="inline-flex h-full items-center justify-center rounded-md border bg-gray-50 px-3 py-1.5 text-xs font-medium text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:bg-gray-200 max-sm:hidden sm:text-sm"
      onClick={createVersion}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-3 w-3 animate-spin stroke-[2.5]" />
      ) : (
        <Layers2 className="mr-2 h-3 w-3 stroke-[2.5]" />
      )}
      Create your own Version
    </button>
  );
}
