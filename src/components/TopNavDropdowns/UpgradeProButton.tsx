import { Zap } from 'lucide-react';
import { useIsPaidUser } from '../../queries/billing';
import { cn } from '../../lib/classname';

export function UpgradeProButton() {
  const { isPaidUser, isLoading } = useIsPaidUser();

  return (
    <a
      href="/premium"
      className={cn(
        'group animate-fade-in relative hidden items-center gap-1.5 font-medium text-yellow-400 transition-all duration-200 hover:text-yellow-300 xl:flex',
        (isPaidUser || isLoading) && 'hidden!',
      )}
    >
      <Zap className="h-4 w-4 fill-current" />
      Upgrade to Pro
    </a>
  );
}
