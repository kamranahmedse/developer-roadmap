import {
  Github,
  Globe,
  LinkedinIcon,
  Mail,
  Pencil,
  Twitter,
} from 'lucide-react';
import type { GetPublicProfileResponse } from '../../api/user';
import { DailyDevIcon } from '../DailyDevIcon';

type UserPublicProfileHeaderProps = {
  userDetails: GetPublicProfileResponse;
};

export function UserPublicProfileHeader(props: UserPublicProfileHeaderProps) {
  const { userDetails } = props;

  const { name, links, publicConfig, avatar, email, isOwnProfile } =
    userDetails;
  const { headline, isAvailableForHire, isEmailVisible } = publicConfig!;

  return (
    <div className="container relative flex items-center gap-6 rounded-xl border bg-white p-8">
      <img
        src={
          avatar
            ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
            : '/images/default-avatar.png'
        }
        alt={name}
        className="h-32 w-32 rounded-full object-cover"
      />

      <div>
        {isAvailableForHire && (
          <span className="mb-1 inline-block rounded-md bg-green-100 px-2 py-1 text-sm text-green-700">
            Available for hire
          </span>
        )}
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="mt-1 text-base text-gray-500">{headline}</p>
        <div className="mt-3 flex items-center gap-2">
          {links?.github && <UserLink href={links?.github} icon={Github} />}
          {links?.linkedin && (
            <UserLink href={links?.linkedin} icon={LinkedinIcon} />
          )}
          {links?.twitter && <UserLink href={links?.twitter} icon={Twitter} />}
          {links?.dailydev && (
            <UserLink href={links?.dailydev} icon={DailyDevIcon} />
          )}
          {links?.website && <UserLink href={links?.website} icon={Globe} />}
          {isEmailVisible && <UserLink href={`mailto:${email}`} icon={Mail} />}
        </div>
      </div>

      {isOwnProfile && (
        <a
          href="/account/update-profile"
          className="absolute right-4 top-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-black"
        >
          <Pencil className="h-3 w-3 stroke-2" />
          Edit Profile
        </a>
      )}
    </div>
  );
}

type UserLinkProps = {
  href: string;
  icon: ((props: React.SVGProps<SVGSVGElement>) => JSX.Element) | typeof Globe;
};

export function UserLink(props: UserLinkProps) {
  const { href, icon: Icon } = props;

  return (
    <a
      target="_blank"
      href={href}
      className="flex h-6 w-6 items-center justify-center rounded-md border"
    >
      <Icon className="h-3.5 w-3.5 shrink-0 stroke-2" />
    </a>
  );
}
