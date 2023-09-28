import { Globe2, Lock, Users, Users2 } from 'lucide-react';
import type { AllowedRoadmapVisibility } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { cn } from '../../lib/classname';

export const allowedVisibilityLabels: {
  id: AllowedRoadmapVisibility;
  label: string;
  long: string;
  icon: typeof Lock;
}[] = [
  {
    id: 'me',
    label: 'Only me',
    long: 'Only visible to me',
    icon: Lock,
  },
  {
    id: 'public',
    label: 'Anyone with the link',
    long: 'Anyone with the link',
    icon: Globe2,
  },
  {
    id: 'friends',
    label: 'Only Friends',
    long: 'Only friends can view',
    icon: Users,
  },
  {
    id: 'team',
    label: 'Only Members',
    long: 'Visible to team members',
    icon: Users2,
  },
];

type ShareSettingsTabsProps = {
  visibility: AllowedRoadmapVisibility;
  setVisibility: (visibility: AllowedRoadmapVisibility) => void;
  teamId?: string;

  onChange: (visibility: AllowedRoadmapVisibility) => void;
};

export function ShareSettingsTabs(props: ShareSettingsTabsProps) {
  const { visibility, setVisibility, teamId, onChange } = props;

  const handleClick = (visibility: AllowedRoadmapVisibility) => {
    setVisibility(visibility);
    onChange(visibility);
  };

  return (
    <ul className="flex w-full items-center gap-1.5">
      {allowedVisibilityLabels.map((v) => {
        if (v.id === 'friends' && teamId) {
          return null;
        } else if (v.id === 'team' && !teamId) {
          return null;
        }

        const isActive = v.id === visibility;
        return (
          <li key={v.id} className="grow">
            <OptionTab
              label={v.label}
              isActive={isActive}
              icon={v.icon}
              onClick={() => {
                handleClick(v.id);
              }}
            />
          </li>
        );
      })}

      {!teamId && (
        <li className="grow">
          <OptionTab
            label="Transfer to team"
            icon={Users2}
            isActive={visibility === 'team'}
            onClick={() => {
              handleClick('team');
            }}
            className="border-red-200 text-red-600 hover:bg-red-50 data-[active='true']:bg-red-100 data-[active='true']:text-red-600 data-[active='true']:hover:bg-red-100 data-[active='true']:hover:text-red-600"
          />
        </li>
      )}
    </ul>
  );
}

type OptionTabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: typeof Lock;
  className?: string;
};

function OptionTab(props: OptionTabProps) {
  const { label, isActive, onClick, icon: Icon, className } = props;

  return (
    <button
      className={cn(
        'flex w-full items-center justify-center gap-1.5 rounded-md border p-2 hover:bg-gray-100',
        'data-[active="true"]:bg-gray-900 data-[active="true"]:text-white data-[active="true"]:hover:bg-gray-900',
        className
      )}
      data-active={isActive}
      disabled={isActive}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}
