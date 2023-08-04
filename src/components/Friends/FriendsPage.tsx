import { useEffect, useState } from 'preact/hooks';
import CopyIcon from '../../icons/copy.svg';
import UserPlus from '../../icons/user-plus.svg';
import { pageProgressMessage } from '../../stores/page';
import { useAuth } from '../../hooks/use-auth';
import {EmptyFriends} from "./EmptyFriends";

export function FriendsPage() {
  const user = useAuth();

  useEffect(() => {
    pageProgressMessage.set('');
  }, []);

  const baseUrl = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://roadmap.sh';
  const befriendUrl = `${baseUrl}/befriend?u=${user?.id}`;

  return <EmptyFriends />
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className={'text-sm text-gray-400'}>
          You have 4 friends on Roadmap.sh
        </span>
        <button class="flex items-center justify-center gap-2 rounded-md border border-gray-400 bg-gray-50 p-1 px-2 text-sm hover:border-gray-500 hover:bg-gray-100">
          <img src={UserPlus} className="h-4 w-4" alt="Invite Friends" />
          Invite Friends
        </button>
      </div>
    </div>
  );
}
