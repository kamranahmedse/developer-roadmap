import UserPlusIcon from '../../icons/user-plus.svg';
import CopyIcon from '../../icons/copy.svg';
import { useAuth } from '../../hooks/use-auth';
import { useCopyText } from '../../hooks/use-copy-text';

export function EmptyFriends() {
  const user = useAuth();
  const { isCopied, copyText } = useCopyText();
  const befriendUrl = `https://roadmap.sh/befriend?u=${user?.id}`;

  return (
    <div class="rounded-md">
      <div class="flex flex-col items-center p-7 text-center max-w-[450px] mx-auto">
        <img
          alt="no friends"
          src={UserPlusIcon}
          class="mb-2 h-[60px] w-[60px] opacity-10 sm:h-[120px] sm:w-[120px]"
        />
        <h2 class="text-lg font-bold sm:text-xl">Invite your Friends</h2>
        <p className="mb-4 mt-1 max-w-[400px] text-sm text-gray-500">
          Share the link below with your friends to invite them
        </p>

        <div class="flex w-full items-center justify-center gap-2 rounded-lg border-2 p-1 text-sm">
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
            class={`flex items-center justify-center gap-1 rounded-md border-0 p-2 px-3 text-sm text-black ${isCopied ? 'bg-green-300 hover:bg-green-300' : 'bg-gray-200 hover:bg-gray-300'}`}
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
