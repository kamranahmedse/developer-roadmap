import { useEffect, useState } from 'react';
import { pageProgressMessage } from '../../stores/page';
import { useAuth } from '../../hooks/use-auth';
import { AddUserIcon } from '../ReactIcons/AddUserIcon';
import { httpGet } from '../../lib/http';
import type { FriendshipStatus } from '../Befriend';
import { useToast } from '../../hooks/use-toast';
import { EmptyFriends } from './EmptyFriends';
import { FriendProgressItem } from './FriendProgressItem';
import UserIcon from '../../icons/user.svg';
import { UserProgressModal } from '../UserProgress/UserProgressModal';
import { InviteFriendPopup } from './InviteFriendPopup';

type FriendResourceProgress = {
  updatedAt: string;
  title: string;
  resourceId: string;
  resourceType: string;
  isCustomResource: boolean;
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

type GroupingType = {
  label: string;
  value: 'active' | 'requests' | 'sent';
  statuses: FriendshipStatus[];
};

const groupingTypes: GroupingType[] = [
  { label: 'Active', value: 'active', statuses: ['accepted'] },
  { label: 'Requests', value: 'requests', statuses: ['received', 'rejected'] },
  { label: 'Sent', value: 'sent', statuses: ['sent', 'got_rejected'] },
];

export function FriendsPage() {
  const toast = useToast();

  const [showInviteFriendPopup, setShowInviteFriendPopup] = useState(false);

  const [showFriendProgress, setShowFriendProgress] = useState<{
    resourceId: string;
    friend: ListFriendsResponse[0];
    isCustomResource?: boolean;
  }>();

  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState<ListFriendsResponse>([]);
  const [selectedGrouping, setSelectedGrouping] =
    useState<GroupingType['value']>('active');

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
      setIsLoading(false);
    });
  }, []);

  const user = useAuth();
  const baseUrl = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://roadmap.sh';
  const befriendUrl = `${baseUrl}/befriend?u=${user?.id}`;

  const selectedGroupingType = groupingTypes.find(
    (grouping) => grouping.value === selectedGrouping
  );

  const filteredFriends = friends.filter((friend) =>
    selectedGroupingType?.statuses.includes(friend.status)
  );

  const receivedRequests = friends.filter(
    (friend) => friend.status === 'received'
  );

  if (isLoading) {
    return null;
  }

  if (!friends?.length) {
    return <EmptyFriends befriendUrl={befriendUrl} />;
  }

  return (
    <div>
      {showInviteFriendPopup && (
        <InviteFriendPopup
          befriendUrl={befriendUrl}
          onClose={() => setShowInviteFriendPopup(false)}
        />
      )}

      {showFriendProgress && (
        <UserProgressModal
          userId={showFriendProgress.friend.userId}
          resourceId={showFriendProgress.resourceId}
          resourceType={'roadmap'}
          onClose={() => setShowFriendProgress(undefined)}
          isCustomResource={showFriendProgress.isCustomResource}
        />
      )}

      <div className="mb-4 flex flex-col items-stretch justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex items-center gap-2">
          {groupingTypes.map((grouping) => {
            let requestCount = 0;
            if (grouping.value === 'requests') {
              requestCount = receivedRequests.length;
            }

            return (
              <button
                key={grouping.value}
                className={`relative flex items-center justify-center rounded-md border p-1 px-3 text-sm ${
                  selectedGrouping === grouping.value
                    ? ' border-gray-400 bg-gray-200 '
                    : ''
                } w-full sm:w-auto`}
                onClick={() => setSelectedGrouping(grouping.value)}
              >
                {grouping.label}
                {requestCount > 0 && (
                  <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {requestCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            setShowInviteFriendPopup(true);
          }}
          className="flex items-center justify-center gap-1.5 rounded-md border border-gray-400 bg-gray-50 p-1 px-2 text-sm hover:border-gray-500 hover:bg-gray-100"
        >
          <AddUserIcon additionalClasses="w-4 h-4" />
          Invite Friends
        </button>
      </div>

      {filteredFriends.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredFriends.map((friend) => (
            <FriendProgressItem
              friend={friend}
              onShowResourceProgress={(resourceId, isCustomResource) => {
                setShowFriendProgress({
                  resourceId,
                  friend,
                  isCustomResource,
                });
              }}
              key={friend.userId}
              onReload={() => {
                pageProgressMessage.set('Reloading friends ..');
                loadFriends().finally(() => {
                  pageProgressMessage.set('');
                });
              }}
            />
          ))}
        </div>
      )}

      {filteredFriends.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <img
            src={UserIcon.src}
            alt="Empty Friends"
            className="mb-3 w-12 opacity-20"
          />
          <h2 className="text-lg font-semibold">
            {selectedGrouping === 'active' && 'No friends yet'}
            {selectedGrouping === 'sent' && 'No requests sent'}
            {selectedGrouping === 'requests' && 'No requests received'}
          </h2>
          <p className="text-sm text-gray-500">
            Invite your friends to join you on Roadmap
          </p>
          <button
            onClick={() => {
              setShowInviteFriendPopup(true);
            }}
            className="mt-4 flex items-center justify-center gap-1.5 rounded-md border border-gray-400 bg-gray-50 p-1 px-2 text-sm hover:border-gray-500 hover:bg-gray-100"
          >
            <AddUserIcon additionalClasses="w-4 h-4" />
            Invite Friends
          </button>
        </div>
      )}
    </div>
  );
}
