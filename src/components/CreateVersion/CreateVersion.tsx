import { useState } from 'react';
import { httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { isLoggedIn } from '../../lib/jwt';
import { GitFork, Layers2, Loader2 } from 'lucide-react';
import { showLoginPopup } from '../../lib/popup';

type CreateVersionProps = {
  roadmapId: string;
};

export function CreateVersion(props: CreateVersionProps) {
  const { roadmapId } = props;

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

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
      disabled={isLoading}
      className="flex items-center justify-center rounded-md border bg-gray-50 px-2.5 py-1 text-xs font-medium text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:hover:bg-gray-100 max-sm:hidden sm:text-sm"
      onClick={() => setIsConfirming(true)}
    >
      {isLoading ? (
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
