import { useState } from 'react';
import type {
  LeadeboardUserDetails,
  ListLeaderboardStatsResponse,
} from '../../api/leaderboard';
import { cn } from '../../lib/classname';

type LeaderboardPageProps = {
  stats: ListLeaderboardStatsResponse;
};

export function LeaderboardPage(props: LeaderboardPageProps) {
  const { stats } = props;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-10">
        <h2 className="mb-0.5 text-2xl font-bold sm:mb-2 sm:text-3xl">
          Leaderboard
        </h2>
        <p className="text-balance text-sm text-gray-500 sm:text-base">
          Top users based on their activity on roadmap.sh
        </p>

        <div className="mt-8 grid grid-cols-2 gap-2">
          <LeaderboardLane
            title="Most Streaks"
            tabs={[{ title: 'All Time', users: stats.longestStreaks }]}
          />
          <LeaderboardLane
            title="Projects"
            tabs={[
              { title: 'Lifetime', users: stats.projectSubmissions.lifetime },
              {
                title: 'This Month',
                users: stats.projectSubmissions.currentMonth,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

type LeaderboardLaneProps = {
  title: string;
  tabs: {
    title: string;
    users: LeadeboardUserDetails[];
  }[];
};

function LeaderboardLane(props: LeaderboardLaneProps) {
  const { title, tabs } = props;

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const usersToShow = activeTab.users;

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b px-4 py-2">
        <h2 className="text-lg font-medium">{title}</h2>

        {tabs.length > 1 && (
          <div className="flex items-center overflow-hidden rounded-md border">
            {tabs.map((tab) => {
              const isActive = tab === activeTab;

              return (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-2 py-0.5 text-sm text-gray-500 hover:bg-gray-100',
                    isActive ? 'bg-gray-200 text-black' : 'bg-white',
                  )}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <ul className="divide-y">
        {usersToShow.map((user, counter) => {
          const avatar = user?.avatar
            ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${user.avatar}`
            : '/images/default-avatar.png';

          return (
            <li
              key={user.id}
              className="flex items-center justify-between gap-1 p-2 px-4"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center tabular-nums">
                  {counter + 1}
                </span>

                <img
                  src={avatar}
                  alt={user.name}
                  className="size-8 shrink-0 rounded-full"
                />
                <span className="truncate">{user.name}</span>
              </div>

              <span className="text-sm text-gray-500">{user.count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
