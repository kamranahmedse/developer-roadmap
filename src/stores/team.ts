import { atom, computed } from 'nanostores';
import type { UserTeamItem } from '../components/TeamDropdown/TeamDropdown';

export const $teamList = atom<UserTeamItem[]>([]);
export const $currentTeam = atom<UserTeamItem | undefined>();

export const $currentTeamRole = computed($currentTeam, (team) => team?.role);

export const $isCurrentTeamAdmin = computed($currentTeamRole, (role) =>
  ['admin'].includes(role!)
);

export const $canManageCurrentTeam = computed($currentTeamRole, (role) =>
  ['admin', 'manager'].includes(role!)
);
