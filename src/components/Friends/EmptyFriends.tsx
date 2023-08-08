import UserPlusIcon from '../../icons/user-plus.svg';
import CopyIcon from '../../icons/copy.svg';
import { useCopyText } from '../../hooks/use-copy-text';

type EmptyFriendsProps = {
  befriendUrl: string;
};

export function EmptyFriends(props: EmptyFriendsProps) {
  const { befriendUrl } = props;
  const { isCopied, copyText } = useCopyText();

  return (
    <div class="rounded-md">
      <div class="mx-auto flex flex-col items-center p-7 text-center">
        <img
          alt="no friends"
          src={UserPlusIcon}
          class="mb-2 h-[60px] w-[60px] opacity-10 sm:h-[120px] sm:w-[120px]"
        />
        <h2 class="text-lg font-bold sm:text-xl">Invite your Friends</h2>
        <p className="mb-4 mt-1 max-w-[400px] text-sm leading-relaxed text-gray-500">
          Share the unique link below with your friends to track their skills and progress.
        </p>

        <div class="flex w-full max-w-[352px] items-center justify-center gap-2 rounded-lg border-2 p-1 text-sm">
          <input
            onClick={(e) => {
              e.currentTarget.select();
              copyText(befriendUrl);
            }}
            type="text"
            value={befriendUrl}
            class="w-full border-none bg-transparent px-1.5 outline-none"
            readonly
          />
          <button
            class={`flex items-center justify-center gap-1 rounded-md border-0 p-2 px-4 text-sm text-black ${
              isCopied
                ? 'bg-green-300 hover:bg-green-300'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => {
              copyText(befriendUrl);
            }}
          >
            <img src={CopyIcon} className="h-4 w-4" alt="Invite Friends" />
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
