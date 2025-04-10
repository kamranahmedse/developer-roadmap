import { useQuery } from '@tanstack/react-query';
import { AITutorLimits } from './AITutorLimits';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';

type AITutorHeaderProps = {
  title: string;
  isPaidUser: boolean;
  isPaidUserLoading: boolean;
  setShowUpgradePopup: (show: boolean) => void;
  children?: React.ReactNode;
};

export function AITutorHeader(props: AITutorHeaderProps) {
  const {
    title,
    isPaidUser,
    isPaidUserLoading,
    setShowUpgradePopup,
    children,
  } = props;

  const { data: limits } = useQuery(getAiCourseLimitOptions(), queryClient);

  const { used, limit } = limits ?? { used: 0, limit: 0 };

  return (
    <div className="mb-3 flex min-h-[35px] items-center justify-between max-sm:mb-1">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-2">
        <AITutorLimits
          used={used}
          limit={limit}
          isPaidUser={isPaidUser}
          isPaidUserLoading={isPaidUserLoading}
          onUpgradeClick={() => setShowUpgradePopup(true)}
        />

        {children}
      </div>
    </div>
  );
}
