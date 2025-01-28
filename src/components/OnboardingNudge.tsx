import { cn } from '../lib/classname.ts';
import { memo, useEffect, useState } from 'react';
import { useScrollPosition } from '../hooks/use-scroll-position.ts';
import { X } from 'lucide-react';
import { isOnboardingStripHidden } from '../stores/page.ts';
import { useStore } from '@nanostores/react';

type OnboardingNudgeProps = {
  onStartOnboarding: () => void;
};

export const NUDGE_ONBOARDING_KEY = 'should_nudge_onboarding';

export function OnboardingNudge(props: OnboardingNudgeProps) {
  const { onStartOnboarding } = props;

  const [isLoading, setIsLoading] = useState(false);

  const $isOnboardingStripHidden = useStore(isOnboardingStripHidden);
  const { y: scrollY } = useScrollPosition();

  useEffect(() => {
    if (localStorage.getItem(NUDGE_ONBOARDING_KEY) === null) {
      localStorage.setItem(NUDGE_ONBOARDING_KEY, 'true');
    }
  }, []);

  if (localStorage.getItem(NUDGE_ONBOARDING_KEY) !== 'true') {
    return null;
  }

  if (scrollY < 100) {
    return null;
  }

  if ($isOnboardingStripHidden) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 z-91 flex w-full items-center justify-center border-b border-b-yellow-500/30 bg-yellow-300 pb-2 pt-1.5',
        {
          'striped-loader': isLoading,
        },
      )}
    >
      <p className="text-base font-semibold text-yellow-950">
        Welcome! Please take a moment to{' '}
        <button
          type="button"
          onClick={() => {
            setIsLoading(true);
            localStorage.setItem(NUDGE_ONBOARDING_KEY, 'false');
            onStartOnboarding();
          }}
          className="underline"
        >
          complete onboarding
        </button>
        <button
          type="button"
          className="relative top-[3px] ml-1 px-1 py-1 text-yellow-600 hover:text-yellow-950"
          onClick={(e) => {
            e.stopPropagation();
            localStorage.setItem(NUDGE_ONBOARDING_KEY, 'false');
            setIsLoading(true);
          }}
        >
          <X className="h-4 w-4" strokeWidth={3} />
        </button>
      </p>
    </div>
  );
}
