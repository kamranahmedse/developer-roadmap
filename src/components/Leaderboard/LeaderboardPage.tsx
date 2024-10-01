import { type ReactNode, useState } from 'react';
import type {
  LeadeboardUserDetails,
  ListLeaderboardStatsResponse,
} from '../../api/leaderboard';
import { cn } from '../../lib/classname';
import { FolderKanban, GitPullRequest, Trophy, Zap } from 'lucide-react';
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
      <div className="container py-5 sm:py-10">
        <div className="mb-8 text-center">
          <div className="flex flex-col items-start sm:items-center justify-center">
            <img
              src={'/images/gifs/star.gif'}
              alt="party-popper"
              className="mb-4 mt-0 sm:mt-3 h-14 w-14 hidden sm:block"
            />
            <div className="mb-0 sm:mb-4 flex flex-col items-start sm:items-center justify-start sm:justify-center">
              <h2 className="mb-1.5 sm:mb-2 text-2xl font-semibold sm:text-4xl">
                Leaderboard
              </h2>
              <p className="max-w-2xl text-left sm:text-center text-balance text-sm text-gray-500 sm:text-base">
                Top users based on their activity on roadmap.sh
              </p>
            </div>
          </div>

          <div className="mt-5 sm:mt-8 grid gap-2 md:grid-cols-2">
            <LeaderboardLane
              title="Longest Visit Streak"
              tabs={[
                {
                  title: 'Active',
                  users: stats.streaks?.active || [],
                  emptyIcon: <Zap className="size-16 text-gray-300" />,
                  emptyText: 'No users with streaks yet',
                },
                {
                  title: 'Lifetime',
                  users: stats.streaks?.lifetime || [],
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
            <LeaderboardLane
              title="Top Contributors"
              tabs={[
                {
                  title: 'This Month',
                  users: stats.githubContributors.currentMonth,
                  emptyIcon: (
                    <GitPullRequest className="size-16 text-gray-300" />
                  ),
                  emptyText: 'No contributors this month',
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
    <div className="flex flex-col overflow-hidden rounded-xl border bg-white min-h-[450px] ">
      <div className="mb-3 flex items-center justify-between gap-2 px-3 py-3">
        <h3 className="text-base font-medium">{title}</h3>

        {tabs.length > 1 && (
          <div className="flex items-center gap-2">
            {tabs.map((tab) => {
              const isActive = tab === activeTab;

              return (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'text-sm font-medium underline-offset-2 transition-colors',
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
        <div className="flex flex-grow flex-col items-center justify-center p-8">
          {emptyIcon}
          <p className="mt-4 text-sm text-gray-500">{emptyText}</p>
        </div>
      )}

      {usersToShow.length > 0 && (
        <ul className="divide-y divide-gray-100 pb-4">
          {usersToShow.map((user, counter) => {
            const avatar = user?.avatar
              ? user?.avatar?.startsWith('http')
                ? user?.avatar
                : `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${user.avatar}`
              : '/images/default-avatar.png';

            const rank = counter + 1;
            const isGitHubUser = avatar?.indexOf('github') > -1;

            return (
              <li
                key={user.id}
                className="flex items-center justify-between gap-1 py-2.5 pl-2 pr-5"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={cn(
                      'relative mr-1 flex size-6 shrink-0 items-center justify-center rounded-full text-xs tabular-nums',
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
                    className="mr-1 size-7 shrink-0 rounded-full"
                  />
                  {isGitHubUser ? (
                    <a
                      href={`https://github.com/${user.name}`}
                      target="_blank"
                      className="truncate font-medium underline underline-offset-2"
                    >
                      {user.name}
                    </a>
                  ) : (
                    <span className="truncate">{user.name}</span>
                  )}
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

                {isGitHubUser ? (
                  <a
                    target={'_blank'}
                    href={`https://github.com/kamranahmedse/developer-roadmap/pulls/${user.name}`}
                    className="text-sm text-gray-500"
                  >
                    {user.count}
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">{user.count}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
