import { useEffect, useState } from 'react';
import { type RoadmapDocument } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { httpGet } from '../../lib/http';
import type { GetRoadmapListResponse } from '../CustomRoadmap/RoadmapListPage';
import type { ListFriendsResponse } from './FriendsPage';
import type { FriendshipStatus } from '../Befriend';
import { FriendRoamdapsItem } from './FriendRoamdapsItem';
import RoadmapIcon from '../../icons/roadmap.svg';
import { pageProgressMessage } from '../../stores/page';
import { useToast } from '../../hooks/use-toast';

export type GroupByFriendRoadmap = {
  userId: string;
  name: string;
  email: string;
  avatar: string;
  status: FriendshipStatus;
  roadmaps: RoadmapDocument[];
};

type SharedRoadmapListProps = {
  friends: ListFriendsResponse;
};

export function SharedRoadmapList(props: SharedRoadmapListProps) {
  const { friends } = props;

  const toast = useToast();
  const [sharedRoadmaps, setSharedRoadmaps] = useState<RoadmapDocument[]>([]);

  async function loadSharedRoadmaps() {
    pageProgressMessage.set('Loading shared roadmaps');
    const { response, error } = await httpGet<GetRoadmapListResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-user-roadmap-list`
    );

    if (error || !response) {
      console.error(error);
      toast.error(error?.message || 'Failed to load shared roadmaps');
      return;
    }

    setSharedRoadmaps(response?.sharedRoadmaps || []);
  }

  useEffect(() => {
    loadSharedRoadmaps().finally(() => pageProgressMessage.set(''));
  }, []);

  // Group shared roadmaps by friend
  const groupedByFriend: GroupByFriendRoadmap[] = [];
  for (const friend of friends) {
    const roadmaps = sharedRoadmaps.filter(
      (roadmap) => roadmap.creatorId === friend.userId
    );

    if (roadmaps.length > 0) {
      groupedByFriend.push({
        ...friend,
        roadmaps,
      });
    }
  }

  if (sharedRoadmaps.length === 0) {
    return (
      <div className="flex flex-col items-center p-4 py-20">
        <img
          alt="roadmap"
          src={RoadmapIcon.src}
          className="mb-4 h-24 w-24 opacity-10"
        />
        <h3 className="mb-1 text-2xl font-bold text-gray-900">No roadmaps</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {groupedByFriend.map((friend) => {
        const associatedFriend = friends.find(
          (f) => f.userId === friend.userId
        );
        return <FriendRoamdapsItem key={friend.userId} friend={friend} />;
      })}
    </div>
  );
}
