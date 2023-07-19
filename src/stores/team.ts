import { atom, computed } from 'nanostores';
import type { UserTeamItem } from '../components/TeamDropdown/TeamDropdown';
import { getUrlParams } from '../lib/browser';

export const $userTeamList = atom<UserTeamItem[]>([]);
export const $userCurrentTeam = computed($userTeamList, (list) => {
  const { t: teamId } = getUrlParams();

  return list.find((item) => item._id === teamId);
});

export const $userCurrentTeamId = computed(
  $userCurrentTeam,
  (team) => team?._id
);

export const $userCurrentTeamRole = computed(
  $userCurrentTeam,
  (team) => team?.role
);

export const $isCurrentTeamAdmin = computed($userCurrentTeamRole, (role) =>
  ['admin'].includes(role!)
);

export const $canManageCurrentTeam = computed($userCurrentTeamRole, (role) =>
  ['admin', 'manager'].includes(role!)
);
