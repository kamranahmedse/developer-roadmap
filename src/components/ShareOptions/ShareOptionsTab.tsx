import {
  ArrowLeftRight,
  Check,
  Globe2,
  Lock,
  Users,
  Users2,
} from 'lucide-react';
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
    label: 'Public',
    long: 'Anyone can view',
    icon: Globe2,
  },
  {
    id: 'friends',
    label: 'Only friends',
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

type ShareOptionTabsProps = {
  visibility: AllowedRoadmapVisibility;
  setVisibility: (visibility: AllowedRoadmapVisibility) => void;
  teamId?: string;

  onChange: (visibility: AllowedRoadmapVisibility) => void;
};

export function ShareOptionTabs(props: ShareOptionTabsProps) {
  const { visibility, setVisibility, teamId, onChange } = props;

  const handleClick = (visibility: AllowedRoadmapVisibility) => {
    setVisibility(visibility);
    onChange(visibility);
  };

  return (
    <div className="flex justify-between">
      <ul className="flex w-full items-center gap-1.5">
        {allowedVisibilityLabels.map((v) => {
          if (v.id === 'friends' && teamId) {
            return null;
          } else if (v.id === 'team' && !teamId) {
            return null;
          }

          const isActive = v.id === visibility;
          return (
            <li key={v.id}>
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
      </ul>
      {!teamId && (
        <div className="grow">
          <OptionTab
            label="Transfer to team"
            icon={ArrowLeftRight}
            isActive={visibility === 'team'}
            onClick={() => {
              handleClick('team');
            }}
            className='border-red-300 text-red-600 hover:border-red-200 hover:bg-red-50 data-[active="true"]:border-red-600 data-[active="true"]:bg-red-600 data-[active="true"]:text-white'
          />
        </div>
      )}
    </div>
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
        'flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm text-black hover:border-gray-300 hover:bg-gray-100',
        'data-[active="true"]:border-gray-500 data-[active="true"]:bg-gray-200 data-[active="true"]:text-black',
        className
      )}
      data-active={isActive}
      disabled={isActive}
      onClick={onClick}
    >
      {!isActive && <Icon className="h-4 w-4" />}
      {isActive && <Check className="h-4 w-4" />}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}
