import { Copy, Heart } from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { useCopyText } from '../../hooks/use-copy-text';
import { cn } from '../../lib/classname';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import {TrophyEmoji} from "../ReactIcons/TrophyEmoji.tsx";

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
    <div className="-mx-4 mt-6 flex flex-col border-t border-dashed border-t-slate-700 px-4 pt-5 text-center text-sm">
      <p className="font-medium text-slate-500">
        Invite people to join roadmap.sh
      </p>
      <div className="my-4 flex flex-col items-center gap-3.5 rounded-lg bg-slate-900/40 pb-4 pt-5">
        <div className="flex flex-row items-center justify-center gap-1.5">
          {Array.from({ length: 10 }).map((_, index) => (
            <Heart
              key={index}
              className={cn(
                'size-[20px] fill-current',
                index < refByUserCount ? 'text-yellow-300' : 'text-slate-700',
                refByUserCount === 0 && index === 0 ? 'text-slate-500' : '',
              )}
            />
          ))}
        </div>
        {refByUserCount === 0 && (
          <p className="text-slate-500">You haven't invited anyone yet.</p>
        )}

        {refByUserCount > 0 && refByUserCount < 10 && (
          <p className="text-slate-500">{refByUserCount} of 10 users joined</p>
        )}

        {refByUserCount >= 10 && (
          <p className="text-slate-500">
            🎉 You've invited {refByUserCount} users
          </p>
        )}
      </div>
      <p className="leading-normal text-slate-500">
        Share{' '}
        <button
          onClick={() => {
            copyText(referralLink);
          }}
          className={cn(
            'rounded-md bg-slate-700 px-1.5 py-[0.5px] text-slate-300 hover:bg-slate-600',
            {
              'bg-green-500 text-black hover:bg-green-500': isCopied,
            },
          )}
        >
          {!isCopied ? 'this link' : 'the copied link'}{' '}
          {!isCopied && (
            <Copy
              className="relative -top-[1.25px] inline-block size-3"
              strokeWidth={3}
            />
          )}
          {isCopied && (
            <CheckIcon additionalClasses="relative -top-[1.25px] inline-block size-3" />
          )}
        </button>{' '}
        with anyone you think would benefit from roadmap.sh
      </p>

      <p className="mt-6 text-center text-xs">
        <a
          href="/leaderboard"
          className="text-purple-400 underline-offset-2 hover:underline"
        >
          See how you rank on the leaderboard
        </a>
      </p>
    </div>
  );
}
