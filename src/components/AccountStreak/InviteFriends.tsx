import { Copy } from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { useCopyText } from '../../hooks/use-copy-text';
import { cn } from '../../lib/classname';
import { CheckIcon } from '../ReactIcons/CheckIcon';

type InviteFriendsProps = {
  refByUserCount: number;
};

export function InviteFriends(props: InviteFriendsProps) {
  const { refByUserCount } = props;

  const user = useAuth();
  const { copyText, isCopied } = useCopyText();

  const referralLink = new URL(
    `/signup?rc=${user?.id}`,
    import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh',
  ).toString();

  return (
    <div className="">
      <hr className="-mx-4 my-4 border-slate-700" />

      <h4 className="text-sm">Invite Friends</h4>
      <p className="mt-1 text-xs text-slate-400">
        Share the link below to invite anyone to roadmap.sh
      </p>

      <div className="mt-4 flex items-center overflow-hidden rounded-md border border-slate-700">
        <input
          type="text"
          className="grow border-none bg-gray-50 bg-transparent p-1 px-2 text-sm text-slate-300 outline-none focus:outline-none"
          value={referralLink}
          onDoubleClick={(e) => {
            e.currentTarget.select();
            copyText(referralLink);
          }}
          readOnly
        />
        <button
          className={cn(
            'flex items-center gap-2 border-l border-slate-700 p-1.5 px-2 text-sm text-white hover:bg-slate-700',
            isCopied ? 'text-green-500' : '',
          )}
          onClick={() => {
            copyText(referralLink);
          }}
        >
          {isCopied ? (
            <>
              <CheckIcon additionalClasses="size-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3" />
              Copy
            </>
          )}
        </button>
      </div>

      <p className="mt-2.5 text-center text-xs">
        🥳 You have invited{' '}
        <span className="font-medium underline underline-offset-2">
          {refByUserCount} users so far
        </span>
      </p>

      <a
        href="/leaderboard"
        className="mt-4 flex justify-center text-center text-sm font-medium text-purple-500 underline-offset-2 hover:underline"
      >
        See how you are compare to others
      </a>
    </div>
  );
}
