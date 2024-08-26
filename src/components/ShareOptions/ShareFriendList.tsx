import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { UserItem } from './UserItem';
import { Check, Copy, Group, UserPlus2, Users2 } from 'lucide-react';
import { httpGet } from '../../lib/http';
import { getUser } from '../../lib/jwt.ts';
import { useCopyText } from '../../hooks/use-copy-text.ts';
import { cn } from '../../lib/classname.ts';

export type FriendshipStatus =
  | 'none'
  | 'sent'
  | 'received'
  | 'accepted'
  | 'rejected'
  | 'got_rejected';

type FriendResourceProgress = {
  updatedAt: string;
  title: string;
  resourceId: string;
  resourceType: string;
  learning: number;
  skipped: number;
  done: number;
  total: number;
};

export type ListFriendsResponse = {
  userId: string;
  name: string;
  email: string;
  avatar: string;
  status: FriendshipStatus;
  roadmaps: FriendResourceProgress[];
  bestPractices: FriendResourceProgress[];
}[];

type ShareFriendListProps = {
  setFriends: (friends: ListFriendsResponse) => void;
  friends: ListFriendsResponse;
  sharedFriendIds: string[];
  setSharedFriendIds: (friendIds: string[]) => void;
};

export function ShareFriendList(props: ShareFriendListProps) {
  const userId = getUser()?.id!;
  const { setFriends, friends, sharedFriendIds, setSharedFriendIds } = props;
  const toast = useToast();

  const { isCopied, copyText } = useCopyText();
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingFriend, setIsAddingFriend] = useState(false);

  async function loadFriends() {
    if (friends.length > 0) {
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpGet<ListFriendsResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-friends`,
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    setFriends(response.filter((friend) => friend.status === 'accepted'));
  }

  useEffect(() => {
    loadFriends().finally(() => {
      setIsLoading(false);
    });
  }, []);

  const loadingFriends = isLoading && (
    <ul className="mt-2 grid grid-cols-3 gap-1.5">
      {[...Array(3)].map((_, idx) => (
        <li
          key={idx}
          className="flex animate-pulse items-center gap-2.5 rounded-md border p-2"
        >
          <div className="relative top-[1px] h-10 w-10 shrink-0 rounded-full bg-gray-200" />
          <div className="inline-grid w-full">
            <div className="h-5 w-2/4 rounded bg-gray-200" />
            <div className="mt-1 h-5 w-3/4 rounded bg-gray-200" />
          </div>
        </li>
      ))}
    </ul>
  );

  const isDev = import.meta.env.DEV;
  const baseWebUrl = isDev ? 'http://localhost:3000' : 'https://roadmap.sh';
  const befriendUrl = `${baseWebUrl}/befriend?u=${userId}`;

  return (
    <>
      {(friends.length > 0 || isLoading) && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm">Select Friends to share the roadmap with</p>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={sharedFriendIds.length === friends.length}
              onChange={(e) => {
                if (e.target.checked) {
                  setSharedFriendIds(friends.map((f) => f.userId));
                } else {
                  setSharedFriendIds([]);
                }
              }}
            />
            <span className="text-sm">Select all</span>
          </label>
        </div>
      )}

      {loadingFriends}
      {friends.length > 0 && !isLoading && (
        <>
          <ul className="mt-2 grid grid-cols-3 gap-1.5">
            {friends.map((friend) => {
              const isSelected = sharedFriendIds?.includes(friend.userId);
              return (
                <li key={friend.userId}>
                  <UserItem
                    user={{
                      name: friend.name,
                      avatar: friend.avatar,
                      email: friend.email,
                    }}
                    isSelected={isSelected}
                    onClick={() => {
                      if (isSelected) {
                        setSharedFriendIds(
                          sharedFriendIds.filter((id) => id !== friend.userId),
                        );
                      } else {
                        setSharedFriendIds([...sharedFriendIds, friend.userId]);
                      }
                    }}
                  />
                </li>
              );
            })}
          </ul>
          {!isAddingFriend && (
            <p className="mt-6 text-sm text-gray-600">
              Don't see a Friend?{' '}
              <button
                onClick={() => {
                  setIsAddingFriend(true);
                }}
                className="font-semibold text-gray-900 underline"
              >
                Add them
              </button>
            </p>
          )}
          {isAddingFriend && (
            <div className="-mx-4 -mb-4 mt-6 border-t bg-gray-50 px-4 py-4">
              <p className="mb-1.5 flex items-center gap-1 text-sm text-gray-800">
                <UserPlus2 className="text-gray-500" size="20px" />
                Share the link below with your friends to invite them
              </p>
              <div className="relative">
                <input
                  readOnly
                  type="text"
                  value={befriendUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    (e.target as HTMLInputElement).select();
                    copyText(befriendUrl);
                  }}
                  className={cn(
                    'w-full rounded-md border px-2 py-2 text-sm focus:shadow-none focus:outline-0',
                    {
                      'border-green-400 bg-green-50': isCopied,
                    },
                  )}
                />
                <button
                  onClick={() => copyText(befriendUrl)}
                  className="absolute bottom-0 right-0 top-0 flex items-center px-2.5"
                >
                  {isCopied ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                      <Check className="text-green-600" size="18px" /> Copied
                    </span>
                  ) : (
                    <Copy className="text-gray-400" size="18px" />
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {friends.length === 0 && !isLoading && (
        <div className="flex h-full flex-grow flex-col items-center justify-center rounded-md border bg-gray-50 text-center">
          <Users2 className="mb-3 h-10 w-10 text-gray-300" />
          <p className="font-medium text-gray-500">
            You do not have any friends yet. <br />{' '}
            <a
              target="_blank"
              className="underline underline-offset-2 text-sm"
              href={`/account/friends`}
            >
              Invite your friends to share roadmaps with.
            </a>
          </p>
        </div>
      )}
    </>
  );
}
