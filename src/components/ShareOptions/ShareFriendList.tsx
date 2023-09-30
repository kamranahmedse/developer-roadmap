import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { UserItem } from './UserItem';
import { Users2 } from 'lucide-react';
import {httpGet} from "../../lib/http";

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
  const { setFriends, friends, sharedFriendIds, setSharedFriendIds } = props;
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  async function loadFriends() {
    if (friends.length > 0) {
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpGet<ListFriendsResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-friends`
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
                        sharedFriendIds.filter((id) => id !== friend.userId)
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
      )}

      {friends.length === 0 && !isLoading && (
        <div className="flex h-full flex-grow flex-col items-center justify-center rounded-md border bg-gray-50 text-center">
          <Users2 className="mb-3 h-10 w-10 text-gray-300" />
          <p className="font-semibold text-gray-500">
            You do not have any friends yet. <br />{' '}
            <a
              target="_blank"
              className="underline underline-offset-2"
              href={`${import.meta.env.PUBLIC_ROADMAP_WEB_URL}/account/friends`}
            >
              Invite your friends to share roadmaps with.
            </a>
          </p>
        </div>
      )}
    </>
  );
}
