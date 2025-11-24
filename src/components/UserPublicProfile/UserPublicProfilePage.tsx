import type { ProjectPageType } from '../../api/roadmap';
import type { GetPublicProfileResponse } from '../../api/user';
import { PrivateProfileBanner } from './PrivateProfileBanner';
import { UserActivityHeatmap } from './UserPublicActivityHeatmap';
import { UserPublicProfileHeader } from './UserPublicProfileHeader';
import { UserPublicProgresses } from './UserPublicProgresses';
import { UserPublicProjects } from './UserPublicProjects';

type UserPublicProfilePageProps = GetPublicProfileResponse & {
  projectDetails: ProjectPageType[];
};

export function UserPublicProfilePage(props: UserPublicProfilePageProps) {
  const {
    activity,
    username,
    isOwnProfile,
    profileVisibility,
    _id: userId,
    createdAt,
    projectDetails,
  } = props;

  return (
    <div className="min-h-full grow bg-gray-200/40 pb-36 pt-10">
      <div className="container flex flex-col gap-8">
        <PrivateProfileBanner
          isOwnProfile={isOwnProfile}
          profileVisibility={profileVisibility}
        />

        <UserPublicProfileHeader userDetails={props!} />

        <UserActivityHeatmap joinedAt={createdAt} activity={activity!} />
        <div>
          <UserPublicProgresses
            username={username!}
            userId={userId!}
            roadmaps={props.roadmaps}
            publicConfig={props.publicConfig}
          />
          <UserPublicProjects
            userId={userId!}
            projects={props.projects}
            projectDetails={projectDetails}
          />
        </div>
      </div>
    </div>
  );
}
