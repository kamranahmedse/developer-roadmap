import { Check, Clipboard } from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { useCopyText } from '../../hooks/use-copy-text';
import { useToast } from '../../hooks/use-toast';
import { useRef } from 'react';
import { cn } from '../../lib/classname.ts';

type ReferYourFriendProps = {
  onBack: () => void;
};

export function ReferYourFriend(props: ReferYourFriendProps) {
  const { onBack } = props;

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
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Refer your Friends
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Share the URL below with your friends. When they sign up with your link,
        you will get extra roadmap generation credits.
      </p>

      <label className="mt-4 flex flex-col gap-2">
        <input
          ref={inputRef}
          className="w-full rounded-md border bg-gray-100 p-2 px-2.5 text-gray-700 focus:outline-hidden"
          value={referralLink}
          readOnly={true}
          onClick={handleCopy}
        />

        <button
          className={cn(
            'flex h-10 items-center justify-center gap-1.5 rounded-md p-2 px-2.5 text-sm',
            {
              'bg-green-500 text-black transition-colors': isCopied,
              'bg-black text-white rounded-md': !isCopied,
            },
          )}
          onClick={handleCopy}
          disabled={isCopied}
        >
          {isCopied ? (
            <>
              <Check className="h-4 w-4" />
              Copied to Clipboard
            </>
          ) : (
            <>
              <Clipboard className="h-4 w-4" />
              Copy URL
            </>
          )}
        </button>
      </label>
    </div>
  );
}
