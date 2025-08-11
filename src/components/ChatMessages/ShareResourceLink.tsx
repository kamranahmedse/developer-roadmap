import { ShareIcon } from 'lucide-react';
import { useCopyText } from '../../hooks/use-copy-text';
import { cn } from '../../lib/classname';
import { useAuth } from '../../hooks/use-auth';
import { CheckIcon } from '../ReactIcons/CheckIcon';

type ShareResourceLinkProps = {
  roadmapId: string;
};

export function ShareResourceLink(props: ShareResourceLinkProps) {
  const { roadmapId } = props;

  const currentUser = useAuth();
  const { copyText, isCopied } = useCopyText();

  const handleShareResourceLink = () => {
    const url = `${import.meta.env.VITE_ASTRO_APP_URL}/${roadmapId}?s=${currentUser?.id}`;
    copyText(url);
  };

  return (
    <div className="relative my-6 flex flex-wrap gap-1 first:mt-0 last:mb-0">
      <button
        className={cn(
          'flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white p-1 px-1.5 text-left text-sm',
          isCopied && 'text-green-500',
        )}
        onClick={handleShareResourceLink}
      >
        {!isCopied && (
          <>
            <ShareIcon className="h-4 w-4" />
            Share Progress
          </>
        )}

        {isCopied && (
          <>
            <CheckIcon additionalClasses="size-4" />
            Copied
          </>
        )}
      </button>
    </div>
  );
}
