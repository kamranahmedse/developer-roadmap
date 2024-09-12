import { useState, type ReactNode } from 'react';
import type {
  LeadeboardUserDetails,
  ListLeaderboardStatsResponse,
} from '../../api/leaderboard';
import { cn } from '../../lib/classname';
import { FolderKanban, Zap, Trophy } from 'lucide-react';
import { RankBadgeIcon } from '../ReactIcons/RankBadgeIcon';
import { TrophyEmoji } from '../ReactIcons/TrophyEmoji';
import { SecondPlaceMedalEmoji } from '../ReactIcons/SecondPlaceMedalEmoji';
import { ThirdPlaceMedalEmoji } from '../ReactIcons/ThirdPlaceMedalEmoji';

type LeaderboardPageProps = {
  stats: ListLeaderboardStatsResponse;
};

export function LeaderboardPage(props: LeaderboardPageProps) {
  const { stats } = props;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-10">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <Trophy className="size-8 text-yellow-500" />
            <h2 className="text-2xl font-bold sm:text-3xl">Leaderboard</h2>
          </div>
          <p className="mx-auto max-w-2xl text-balance text-sm text-gray-500 sm:text-base">
            Top users based on their activity on roadmap.sh
          </p>

          <div className="mt-8 grid gap-2 md:grid-cols-2">
            <LeaderboardLane
              title="Longest Visit Streak"
              tabs={[
                {
                  title: 'All Time',
                  users: stats.longestStreaks,
                  emptyIcon: <Zap className="size-16 text-gray-300" />,
                  emptyText: 'No users with streaks yet',
                },
              ]}
            />
            <LeaderboardLane
              title="Projects Completed"
              tabs={[
                {
                  title: 'This Month',
                  users: stats.projectSubmissions.currentMonth,
                  emptyIcon: <FolderKanban className="size-16 text-gray-300" />,
                  emptyText: 'No projects submitted this month',
                },
                {
                  title: 'Lifetime',
                  users: stats.projectSubmissions.lifetime,
                  emptyIcon: <FolderKanban className="size-16 text-gray-300" />,
                  emptyText: 'No projects submitted yet',
                },
              ]}
            />
          </div>
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
    emptyIcon?: ReactNode;
    emptyText?: string;
  }[];
};

function LeaderboardLane(props: LeaderboardLaneProps) {
  const { title, tabs } = props;

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { users: usersToShow, emptyIcon, emptyText } = activeTab;

  return (
    <div className="overflow-hidden rounded-md border bg-white shadow-sm">
      <div className="flex items-center justify-between gap-2 bg-gray-100 px-3 py-2 mb-3">
        <h3 className="text-base text-sm font-medium">{title}</h3>

        {tabs.length > 1 && (
          <div className="flex items-center gap-2">
            {tabs.map((tab) => {
              const isActive = tab === activeTab;

              return (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'text-xs font-medium underline-offset-2 transition-colors',
                    {
                      'text-black underline': isActive,
                      'text-gray-400 hover:text-gray-600': !isActive,
                    },
                  )}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {usersToShow.length === 0 && emptyText && (
        <div className="flex flex-col items-center justify-center p-8">
          {emptyIcon}
          <p className="mt-4 text-sm text-gray-500">{emptyText}</p>
        </div>
      )}

      {usersToShow.length > 0 && (
        <ul className="divide-y divide-gray-100">
          {usersToShow.map((user, counter) => {
            const avatar = user?.avatar
              ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${user.avatar}`
              : '/images/default-avatar.png';
            const rank = counter + 1;

            return (
              <li
                key={user.id}
                className="flex items-center justify-between gap-1 pl-2 pr-5 py-2.5 hover:bg-gray-50"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={cn(
                      'relative text-xs mr-1 flex size-6 shrink-0 items-center justify-center rounded-full tabular-nums',
                      {
                        'text-black': rank <= 3,
                        'text-gray-400': rank > 3,
                      },
                    )}
                  >
                    {rank}
                  </span>

                  <img
                    src={avatar}
                    alt={user.name}
                    className="size-7 shrink-0 rounded-full"
                  />
                  <span className="truncate">{user.name}</span>
                  {rank === 1 ? (
                    <TrophyEmoji className="size-5" />
                  ) : rank === 2 ? (
                    <SecondPlaceMedalEmoji className="size-5" />
                  ) : rank === 3 ? (
                    <ThirdPlaceMedalEmoji className="size-5" />
                  ) : (
                    ''
                  )}
                </div>

                <span className="text-sm text-gray-500">{user.count}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
