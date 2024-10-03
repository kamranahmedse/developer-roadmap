import { type ReactNode, useState } from 'react';
import type {
  LeaderboardUserDetails,
  ListLeaderboardStatsResponse,
} from '../../api/leaderboard';
import { cn } from '../../lib/classname';
import { FolderKanban, GitPullRequest, Users, Users2, Zap } from 'lucide-react';
import { TrophyEmoji } from '../ReactIcons/TrophyEmoji';
import { SecondPlaceMedalEmoji } from '../ReactIcons/SecondPlaceMedalEmoji';
import { ThirdPlaceMedalEmoji } from '../ReactIcons/ThirdPlaceMedalEmoji';

type LeaderboardPageProps = {
  stats: ListLeaderboardStatsResponse;
};

export function LeaderboardPage(props: LeaderboardPageProps) {
  const { stats } = props;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container pb-5 sm:pb-8">
        <h1 className="my-5 flex items-center text-lg font-medium text-black sm:mb-4 sm:mt-8">
          <Users2 className="mr-2 size-5 text-black" />
          Leaderboard
        </h1>

        <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
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
            title="Most Referrals"
            tabs={[
              {
                title: 'This Month',
                users: stats.referrals.currentMonth,
                emptyIcon: <Users className="size-16 text-gray-300" />,
                emptyText: 'No referrals this month',
              },
              {
                title: 'Lifetime',
                users: stats.referrals.lifetime,
                emptyIcon: <Users className="size-16 text-gray-300" />,
                emptyText: 'No referrals yet',
              },
            ]}
          />
          <LeaderboardLane
            title="Top Contributors"
            subtitle="Past 2 weeks"
            tabs={[
              {
                title: 'This Month',
                users: stats.githubContributors.currentMonth,
                emptyIcon: <GitPullRequest className="size-16 text-gray-300" />,
                emptyText: 'No contributors this month',
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
  subtitle?: string;
  tabs: {
    title: string;
    users: LeaderboardUserDetails[];
    emptyIcon?: ReactNode;
    emptyText?: string;
  }[];
};

function LeaderboardLane(props: LeaderboardLaneProps) {
  const { title, subtitle, tabs } = props;

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { users: usersToShow, emptyIcon, emptyText } = activeTab;

  return (
    <div className="flex min-h-[450px] flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2 px-3 py-3">
        <h3 className="text-sm font-medium">
          {title}{' '}
          {subtitle && (
            <span className="ml-1 text-sm font-normal text-gray-400">
              {subtitle}
            </span>
          )}
        </h3>

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
                      href={`https://github.com/kamranahmedse/developer-roadmap/pulls?q=is%3Apr+is%3Aclosed+author%3A${user.name}`}
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

                <span className="text-sm text-gray-500">{user.count}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
