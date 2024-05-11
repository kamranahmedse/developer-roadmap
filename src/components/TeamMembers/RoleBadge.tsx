import { cn } from '../../lib/classname';
import type { AllowedRoles } from '../CreateTeam/RoleDropdown';

type RoleBadgeProps = {
  role: AllowedRoles;
  className?: string;
};
export function MemberRoleBadge(props: RoleBadgeProps) {
  const { role, className } = props;

  return (
    <span
      className={cn(
        `items-center rounded-full px-2 py-0.5 text-xs capitalize sm:flex ${
          ['admin'].includes(role)
            ? 'bg-blue-100 text-blue-700 '
            : 'bg-gray-100 text-gray-700 '
        } ${['manager'].includes(role) ? 'bg-green-100 text-green-700' : ''}`,
        className,
      )}
    >
      {role}
    </span>
  );
}
