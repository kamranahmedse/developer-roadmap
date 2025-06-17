import { ShareIcon } from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { useCopyText } from '../../hooks/use-copy-text';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import { cn } from '../../lib/classname';

type ShareResourceLinkProps = {
  roadmapId: string;
};

export function ShareResourceLink(props: ShareResourceLinkProps) {
  const { roadmapId } = props;
  const user = useAuth();
  const { copyText, isCopied } = useCopyText();

  const handleShareResourceLink = () => {
    const url = `${import.meta.env.PUBLIC_APP_URL}/${roadmapId}?s=${user?.id}`;
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
            <CheckIcon additionalClasses="h-4 w-4" />
            Copied
          </>
        )}
      </button>
    </div>
  );
}
