import { Copy, Heart } from 'lucide-react';
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

  if (refByUserCount === 1) {
    return (
      <div className="mt-6 flex flex-col text-center text-sm border-t border-t-slate-700/40 pt-5 -mx-4 px-4">
        <p className="text-slate-500">Invite 5 Friends to roadmap.sh</p>
        <div className="my-4 flex flex-col items-center bg-slate-900/40 pt-5 pb-4 rounded-lg gap-3.5">
          <div className="flex flex-row items-center justify-center gap-1.5">
            <Heart className="size-[20px] fill-current text-yellow-300" />
            <Heart className="size-[20px] fill-current text-yellow-300" />
            <Heart className="size-[20px] fill-current text-slate-700" />
            <Heart className="size-[20px] fill-current text-slate-700" />
            <Heart className="size-[20px] fill-current text-slate-700" />
          </div>
          <p className="text-slate-500">2 of 5 friends invited</p>
        </div>
        <p className="text-slate-500">
          Share{' '}
          <button className="py-px px-1.5 bg-slate-900/40 rounded-md hover:bg-slate-900/70">
              this link <Copy className="size-3 inline-block" strokeWidth={3} />
          </button> to
          invite your friends.
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <hr className="-mx-4 my-4 border-slate-700/20" />

      <h4 className="text-base text-slate-200">Invite Friends</h4>
      <p className="mt-1 text-sm text-slate-400">
        Invite your friends to join roadmap.sh
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

      <p className="mt-2.5 text-center text-sm">
        {refByUserCount > 0 && (
          <>
            🥳 You have invited{' '}
            <span className="font-medium underline underline-offset-2">
              {refByUserCount} user{refByUserCount > 1 ? 's' : ''} so far
            </span>
          </>
        )}
        {refByUserCount === 0 && <>🤔 You haven't invited anyone yet</>}
      </p>

      <p className="mt-6 text-center text-xs">
        <a
          href="/leaderboard"
          className="text-purple-400 underline-offset-2 hover:underline"
        >
          See how you compare to others
        </a>
      </p>
    </div>
  );
}
