import type { GetPublicProfileResponse } from '../../api/user';
import { UserActivityHeatmap } from './UserPublicActivityHeatmap';
import { UserPublicProfileHeader } from './UserPublicProfileHeader';
import { UserPublicProgresses } from './UserPublicProgresses';

type UserPublicProfilePageProps = GetPublicProfileResponse;

export function UserPublicProfilePage(props: UserPublicProfilePageProps) {
  const { activity, username, isOwnProfile, profileVisibility } = props;

  return (
    <>
      {isOwnProfile && (
        <div className="border-b border-yellow-400 bg-yellow-100 p-2 text-center text-sm font-medium">
          Only you can see this, you can update your profile from{' '}
          <a href="/account/update-profile" className="underline">
            here
          </a>
          .
        </div>
      )}
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
