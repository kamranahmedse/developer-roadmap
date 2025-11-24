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

  return (
    <div className="-mx-4 mt-6 flex flex-col border-t border-dashed border-t-slate-600 px-4 pt-5 text-center text-sm">
      <p className="text-slate-500">Invite people to join roadmap.sh</p>

      <div className="flex flex-col items-center rounded-lg bg-slate-900/40 pb-4 pt-5 my-4">
        <p className="text-xs text-slate-500">
          {refByUserCount === 0 && <>You haven't invited anyone yet.</>}
          {refByUserCount > 0 && refByUserCount < 10 && (
            <>{refByUserCount} of 10 users joined</>
          )}
        </p>

        {refByUserCount >= 10 && <>🎉 You've invited {refByUserCount} users</>}

        <div className="my-3 flex flex-row items-center justify-center gap-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <Heart
              key={index}
              className={cn(
                'size-[23px] fill-current',
                index < refByUserCount ? 'text-yellow-300' : 'text-slate-700',
              )}
            />
          ))}
        </div>
        <p className={'mb-3 text-xs text-slate-500'}>
          Share the link below with anyone you think would benefit from using
          roadmap.sh
        </p>
        <p className="text-slate-500">
          <button
            onClick={() => {
              copyText(referralLink);
            }}
            className={cn(
              'rounded-md hover:bg-slate-500/80 hover:text-slate-100 px-3 py-1 text-xs text-slate-300 bg-slate-600',
              {
                'bg-green-500 text-black hover:text-black hover:bg-green-500': isCopied,
              },
            )}
          >
            {!isCopied ? 'Copy Invite Link' : 'Invite Link Copied'}{' '}
            {!isCopied && (
              <Copy
                className="relative -top-[1.25px] ml-1.5 inline-block size-3"
                strokeWidth={3}
              />
            )}
            {isCopied && (
              <CheckIcon additionalClasses="relative ml-1.5 -top-[1.25px] inline-block size-3" />
            )}
          </button>
        </p>
      </div>

      <p className="text-center text-xs">
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
