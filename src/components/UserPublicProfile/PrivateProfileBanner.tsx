import type { GetPublicProfileResponse } from '../../api/user';

type PrivateProfileBannerProps = Pick<
  GetPublicProfileResponse,
  'isOwnProfile' | 'profileVisibility'
>;

export function PrivateProfileBanner(props: PrivateProfileBannerProps) {
  const { isOwnProfile, profileVisibility } = props;

  if (isOwnProfile && profileVisibility === 'private') {
    return (
      <div className="border-b border-yellow-400 bg-yellow-100 p-2 text-center text-sm font-medium">
        Your profile is private. Only you can see this page.
      </div>
    );
  }

  return null;
}
