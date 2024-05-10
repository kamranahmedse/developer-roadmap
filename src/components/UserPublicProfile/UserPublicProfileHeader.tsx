import { Github, Globe, LinkedinIcon, Mail, Twitter } from 'lucide-react';
import type { GetPublicProfileResponse } from '../../api/user';

type UserPublicProfileHeaderProps = {
  userDetails: GetPublicProfileResponse;
};

export function UserPublicProfileHeader(props: UserPublicProfileHeaderProps) {
  const { userDetails } = props;

  const { name, links, publicConfig, avatar, email } = userDetails;
  const { headline, isAvailableForHire, isEmailVisible } = publicConfig!;

  return (
    <div className="flex items-center gap-6 container bg-white border p-8 rounded-xl">
      <img
        src={
          avatar
            ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
            : '/images/default-avatar.png'
        }
        alt={name}
        className="h-32 w-32 rounded-full"
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
          {links?.website && <UserLink href={links?.website} icon={Globe} />}
          {isEmailVisible && <UserLink href={`mailto:${email}`} icon={Mail} />}
        </div>
      </div>
    </div>
  );
}

type UserLinkProps = {
  href: string;
  icon: typeof Github;
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
