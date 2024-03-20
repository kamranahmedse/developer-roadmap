import { Check, Clipboard } from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { useCopyText } from '../../hooks/use-copy-text';
import { useToast } from '../../hooks/use-toast';
import { useRef } from 'react';

export function ReferYourFriend() {
  const user = useAuth();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const { copyText, isCopied } = useCopyText();
  const referralLink = new URL(
    `/ai?rc=${user?.id}`,
    import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh',
  ).toString();

  const handleCopy = () => {
    inputRef.current?.select();
    copyText(referralLink);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <p className="text-gray-700">
        Share the limit code below. When someone signs up with the link below
        you will get extra roadmaps.
      </p>

      <label className="mt-2 flex items-stretch overflow-hidden rounded-md border bg-gray-50">
        <input
          ref={inputRef}
          className="w-full bg-transparent p-2 px-2.5 text-gray-700 focus:outline-none"
          value={referralLink}
          readOnly={true}
          onClick={handleCopy}
        />

        <button
          className="h-10 border-l p-2 px-2.5"
          onClick={handleCopy}
          disabled={isCopied}
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
        </button>
      </label>
    </div>
  );
}
