import type { GetPublicProfileResponse } from '../../api/user';
import { PrivateProfileBanner } from './PrivateProfileBanner';
import { UserActivityHeatmap } from './UserPublicActivityHeatmap';
import { UserPublicProfileHeader } from './UserPublicProfileHeader';
import { UserPublicProgresses } from './UserPublicProgresses';

type UserPublicProfilePageProps = GetPublicProfileResponse;

export function UserPublicProfilePage(props: UserPublicProfilePageProps) {
  const { activity, username, isOwnProfile, profileVisibility } = props;

  return (
    <>
      <PrivateProfileBanner
        isOwnProfile={isOwnProfile}
        profileVisibility={profileVisibility}
      />
      <section className="container mt-5 pb-10">
        <UserPublicProfileHeader userDetails={props!} />
        <div className="mt-10">
          <UserActivityHeatmap activity={activity!} />
        </div>
        <div className="mt-10">
          <UserPublicProgresses
            username={username!}
            roadmaps={props.roadmaps}
            publicConfig={props.publicConfig}
          />
        </div>
      </section>
    </>
  );
}
