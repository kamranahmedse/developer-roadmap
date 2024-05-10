import type { GetPublicProfileResponse } from '../../api/user';
import { PrivateProfileBanner } from './PrivateProfileBanner';
import { UserActivityHeatmap } from './UserPublicActivityHeatmap';
import { UserPublicProfileHeader } from './UserPublicProfileHeader';
import { UserPublicProgresses } from './UserPublicProgresses';

type UserPublicProfilePageProps = GetPublicProfileResponse;

export function UserPublicProfilePage(props: UserPublicProfilePageProps) {
  const {
    activity,
    username,
    isOwnProfile,
    profileVisibility,
    _id: userId,
    createdAt,
  } = props;

  return (
    <div className="bg-gray-200/40 min-h-full flex-grow pt-10 pb-36">
      <div className="container flex flex-col gap-8">
        <PrivateProfileBanner
          isOwnProfile={isOwnProfile}
          profileVisibility={profileVisibility}
        />

        <UserPublicProfileHeader userDetails={props!} />

        <UserActivityHeatmap joinedAt={createdAt} activity={activity!} />
        <UserPublicProgresses
          username={username!}
          userId={userId!}
          roadmaps={props.roadmaps}
          publicConfig={props.publicConfig}
        />
      </div>
    </div>
  );
}
