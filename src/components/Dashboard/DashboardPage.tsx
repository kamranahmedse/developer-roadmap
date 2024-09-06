import { useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { useStore } from '@nanostores/react';
import { $teamList } from '../../stores/team';
import type { TeamListResponse } from '../TeamDropdown/TeamDropdown';
import { DashboardTab } from './DashboardTab';
import { PersonalDashboard, type BuiltInRoadmap } from './PersonalDashboard';
import { TeamDashboard } from './TeamDashboard';
import { getUser } from '../../lib/jwt';

type DashboardPageProps = {
  builtInRoleRoadmaps?: BuiltInRoadmap[];
  builtInSkillRoadmaps?: BuiltInRoadmap[];
  builtInBestPractices?: BuiltInRoadmap[];
};

export function DashboardPage(props: DashboardPageProps) {
  const { builtInRoleRoadmaps, builtInBestPractices, builtInSkillRoadmaps } =
    props;

  const currentUser = getUser();
  const toast = useToast();
  const teamList = useStore($teamList);

  const userAvatar = currentUser?.avatar
    ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${currentUser.avatar}`
    : '/images/default-avatar.png';

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8">
      <div className="container">
        <PersonalDashboard
          builtInRoleRoadmaps={builtInRoleRoadmaps}
          builtInSkillRoadmaps={builtInSkillRoadmaps}
          builtInBestPractices={builtInBestPractices}
        />
      </div>
    </div>
  );
}
