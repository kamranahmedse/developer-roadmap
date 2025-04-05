import { useEffect, useRef, useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { getUser, isLoggedIn } from '../../lib/jwt';
import { AccountDropdownList } from './AccountDropdownList';
import { DropdownTeamList } from './DropdownTeamList';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal.tsx';
import { OnboardingModal } from './OnboardingModal.tsx';
import { httpGet } from '../../lib/http.ts';
import { useToast } from '../../hooks/use-toast.ts';
import type { UserDocument } from '../../api/user.ts';
import { NotificationIndicator } from './NotificationIndicator.tsx';
import { OnboardingNudge } from '../OnboardingNudge.tsx';

export type OnboardingConfig = Pick<
  UserDocument,
  'onboarding' | 'onboardingStatus'
>;

export function AccountDropdown() {
  const toast = useToast();
  const dropdownRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);

  const [isConfigLoading, setIsConfigLoading] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [onboardingConfig, setOnboardingConfig] = useState<
    OnboardingConfig | undefined
  >(undefined);
  const currentUser = getUser();

  const shouldShowOnboardingStatus =
    currentUser?.onboardingStatus === 'pending' ||
    onboardingConfig?.onboardingStatus === 'pending';

  const loadOnboardingConfig = async () => {
    if (!isLoggedIn() || !shouldShowOnboardingStatus) {
      return;
    }

    setIsConfigLoading(true);
    const { response, error } = await httpGet<OnboardingConfig>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-onboarding-config`,
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to load onboarding config');
    }

    setOnboardingConfig(response);
  };

  useOutsideClick(dropdownRef, () => {
    setShowDropdown(false);
    setIsTeamsOpen(false);
    setIsConfigLoading(true);
  });

  useEffect(() => {
    if (!isLoggedIn() || !showDropdown) {
      return;
    }

    loadOnboardingConfig().finally(() => {
      setIsConfigLoading(false);
    });
  }, [showDropdown]);

  useEffect(() => {
    const loadConfig = () => {
      loadOnboardingConfig().finally(() => {
        setIsConfigLoading(false);
      });
    };

    window.addEventListener('visibilitychange', loadConfig);
    return () => {
      window.removeEventListener('visibilitychange', loadConfig);
    };
  }, []);

  if (!isLoggedIn()) {
    return null;
  }

  const onboardingDoneCount = Object.values(
    onboardingConfig?.onboarding || {},
  ).filter((status) => status !== 'pending').length;
  const onboardingCount = Object.keys(
    onboardingConfig?.onboarding || {},
  ).length;

  return (
    <>
      {shouldShowOnboardingStatus && !isOnboardingModalOpen && (
        <OnboardingNudge
          onStartOnboarding={() => {
            loadOnboardingConfig().then(() => {
              setIsOnboardingModalOpen(true);
            });
          }}
        />
      )}

      <div className="relative z-90 animate-fade-in">
        {isOnboardingModalOpen && onboardingConfig && (
          <OnboardingModal
            onboardingConfig={onboardingConfig}
            onClose={() => {
              setIsOnboardingModalOpen(false);
            }}
            onIgnoreTask={(taskId, status) => {
              loadOnboardingConfig().finally(() => {});
            }}
          />
        )}
        {isCreatingRoadmap && (
          <CreateRoadmapModal
            onClose={() => {
              setIsCreatingRoadmap(false);
            }}
          />
        )}

        <button
          className="relative flex h-8 w-40 items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-purple-500 to-purple-700 px-4 py-2 text-sm font-medium text-white hover:from-purple-500 hover:to-purple-600"
          onClick={() => {
            setIsTeamsOpen(false);
            setShowDropdown(!showDropdown);
          }}
        >
          <span className="inline-flex items-center">
            Account&nbsp;<span className="text-gray-300">/</span>&nbsp;Teams
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 stroke-[2.5px]" />
          {shouldShowOnboardingStatus && !showDropdown && (
            <NotificationIndicator />
          )}
        </button>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 z-50 mt-2 min-h-[152px] w-48 rounded-md bg-slate-800 py-1 shadow-xl"
          >
            {isTeamsOpen ? (
              <DropdownTeamList setIsTeamsOpen={setIsTeamsOpen} />
            ) : (
              <AccountDropdownList
                onCreateRoadmap={() => {
                  setIsCreatingRoadmap(true);
                  setShowDropdown(false);
                }}
                setIsTeamsOpen={setIsTeamsOpen}
                onOnboardingClick={() => {
                  setIsOnboardingModalOpen(true);
                  setShowDropdown(false);
                }}
                shouldShowOnboardingStatus={shouldShowOnboardingStatus}
                isConfigLoading={isConfigLoading}
                onboardingConfigCount={onboardingCount}
                doneConfigCount={onboardingDoneCount}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
