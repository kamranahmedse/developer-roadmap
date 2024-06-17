import type { GetPublicProfileResponse } from '../../api/user';
import { Lock } from 'lucide-react';

type PrivateProfileBannerProps = Pick<
  GetPublicProfileResponse,
  'isOwnProfile' | 'profileVisibility'
>;

export function PrivateProfileBanner(props: PrivateProfileBannerProps) {
  const { isOwnProfile, profileVisibility } = props;

  if (isOwnProfile && profileVisibility === 'private') {
    return (
      <div className="-mb-4 -mt-5 rounded-lg border border-yellow-400 bg-yellow-100 p-2 text-center text-sm font-medium">
        <Lock className="-mt-1 mr-1.5 inline-block h-4 w-4" />
        Your profile is private. Only you can see this page.
      </div>
    );
  }

  return null;
}
