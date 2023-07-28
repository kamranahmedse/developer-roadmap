import type { AllowedRoles } from '../CreateTeam/RoleDropdown';

export function MemberRoleBadge({ role }: { role: AllowedRoles }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs sm:flex items-center capitalize ${['admin'].includes(role)
        ? 'bg-blue-100 text-blue-700 '
        : 'bg-gray-100 text-gray-700 '
        } ${['manager'].includes(role) ? 'bg-green-100 text-green-700' : ''}`}
    >
      {role}
    </span>
  );
}
