import { Github, Globe, LinkedinIcon, Twitter } from 'lucide-react';
import type { GetUserByUsernameResponse } from '../../api/user';

type UserDetailsProps = {
  userDetails: GetUserByUsernameResponse;
};

export function UserDetails(props: UserDetailsProps) {
  const { userDetails } = props;
  const { name, username, links } = userDetails;

  return (
    <div>
      <div className="flex items-center gap-4">
        <img
          src="https://dodrc8eu8m09s.cloudfront.net/avatars/64ab82e214678473bb5d5ac2_1688961762495"
          alt={name}
          className="h-28 w-28 rounded-full"
        />

        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-500">@{username}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 border-b pb-4">
        {links?.github && <UserLink href={links?.github} icon={Github} />}
        {links?.linkedin && (
          <UserLink href={links?.linkedin} icon={LinkedinIcon} />
        )}
        {links?.twitter && <UserLink href={links?.twitter} icon={Twitter} />}
        {links?.website && <UserLink href={links?.website} icon={Globe} />}
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
      className="flex items-center gap-0.5 text-blue-700"
    >
      <Icon className="h-3.5 shrink-0 stroke-2" />
      <span className="truncate text-sm">{href}</span>
    </a>
  );
}
