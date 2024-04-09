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
  } = props;

  return (
    <div className="bg-gray-200/40">
      <div className="container flex flex-col gap-8">
        <PrivateProfileBanner
          isOwnProfile={isOwnProfile}
          profileVisibility={profileVisibility}
        />

        <UserPublicProfileHeader userDetails={props!} />

        <UserActivityHeatmap activity={activity!} />
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
