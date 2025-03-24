import type {
  GetUserProfileRoadmapResponse,
  GetPublicProfileResponse,
} from '../../api/user';
import { getPercentage } from '../../lib/number';
import { PrivateProfileBanner } from './PrivateProfileBanner';
import { UserProfileRoadmapRenderer } from './UserProfileRoadmapRenderer';

type UserProfileRoadmapProps = GetUserProfileRoadmapResponse &
  Pick<
    GetPublicProfileResponse,
    'username' | 'name' | 'isOwnProfile' | 'profileVisibility'
  > & {
    resourceId: string;
  };

export function UserProfileRoadmap(props: UserProfileRoadmapProps) {
  const {
    username,
    name,
    title,
    resourceId,
    isCustomResource,
    done = [],
    skipped = [],
    learning = [],
    topicCount,
    isOwnProfile,
    profileVisibility,
  } = props;

  const trackProgressRoadmapUrl = isCustomResource
    ? `/r/${resourceId}`
    : `/${resourceId}`;

  const totalMarked = done.length + skipped.length;
  const progressPercentage = getPercentage(totalMarked, topicCount);

  return (
    <>
      <PrivateProfileBanner
        isOwnProfile={isOwnProfile}
        profileVisibility={profileVisibility}
      />
      <div className="container mt-5">
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1 text-sm">
            <a
              href={`/u/${username}`}
              className="text-gray-600 hover:text-gray-800"
            >
              {username}
            </a>
            <span>/</span>
            <a
              href={`/u/${username}/${resourceId}`}
              className="text-gray-600 hover:text-gray-800"
            >
              {resourceId}
            </a>
          </p>

          <a
            href={trackProgressRoadmapUrl}
            className="rounded-md border px-2.5 py-1 text-sm font-medium"
          >
            Track your Progress
          </a>
        </div>

        <h2 className="mt-10 text-2xl font-bold sm:text-4xl">{title}</h2>
        <p className="mt-2 text-sm text-gray-500 sm:text-lg">
          Skills {name} has mastered on the {title?.toLowerCase()}.
        </p>
      </div>

      <div className="relative z-50 mt-10 hidden items-center justify-between border-y bg-white px-2 py-1.5 sm:flex">
        <p className="container flex text-sm">
          <span className="mr-2.5 rounded-sm bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
            <span data-progress-percentage="">{progressPercentage}</span>% Done
          </span>

          <span className="itesm-center hidden md:flex">
            <span>
              <span>{done.length}</span> completed
            </span>
            <span className="mx-1.5 text-gray-400">&middot;</span>
            <span>
              <span>{learning.length}</span> in progress
            </span>
            <span className="mx-1.5 text-gray-400">&middot;</span>
            <span>
              <span>{skipped.length}</span> skipped
            </span>
            <span className="mx-1.5 text-gray-400">&middot;</span>
            <span>
              <span>{topicCount}</span> Total
            </span>
          </span>
          <span className="md:hidden">
            <span>{totalMarked}</span> of <span>{topicCount}</span> Done
          </span>
        </p>
      </div>

      <UserProfileRoadmapRenderer {...props} resourceType="roadmap" />
    </>
  );
}
