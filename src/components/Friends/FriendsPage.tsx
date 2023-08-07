import { useEffect, useState } from 'preact/hooks';
import { pageProgressMessage } from '../../stores/page';
import { useAuth } from '../../hooks/use-auth';
import { AddUserIcon } from '../ReactIcons/AddUserIcon';
import { httpGet } from '../../lib/http';
import type { FriendshipStatus } from '../Befriend';
import { useToast } from '../../hooks/use-toast';
import { EmptyFriends } from './EmptyFriends';

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

type ListFriendsResponse = {
  userId: string;
  name: string;
  avatar: string;
  status: FriendshipStatus;
  roadmaps: FriendResourceProgress[];
  bestPractices: FriendResourceProgress[];
}[];

export function FriendsPage() {
  const toast = useToast();
  const [friends, setFriends] = useState<ListFriendsResponse>([]);

  async function loadFriends() {
    const { response, error } = await httpGet<ListFriendsResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-friends`
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    setFriends(response);
  }

  useEffect(() => {
    loadFriends().finally(() => {
      pageProgressMessage.set('');
    });
  }, []);

  const user = useAuth();
  const baseUrl = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://roadmap.sh';
  const befriendUrl = `${baseUrl}/befriend?u=${user?.id}`;

  if (friends.length === 0) {
    return <EmptyFriends befriendUrl={befriendUrl} />;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className={'text-sm text-gray-400'}>
          You have 4 active friends
        </span>
        <button class="flex items-center justify-center gap-1.5 rounded-md border border-gray-400 bg-gray-50 p-1 px-2 text-sm hover:border-gray-500 hover:bg-gray-100">
          <AddUserIcon additionalClasses="w-4 h-4" />
          Invite Friends
        </button>
      </div>
    </div>
  );
}
