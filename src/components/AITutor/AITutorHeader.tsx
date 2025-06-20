import { useQuery } from '@tanstack/react-query';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { useIsPaidUser } from '../../queries/billing';
import { PlusIcon } from 'lucide-react';

type AITutorHeaderProps = {
  title: string;
  subtitle?: string;
  onUpgradeClick: () => void;
  children?: React.ReactNode;
};

export function AITutorHeader(props: AITutorHeaderProps) {
  const { title, subtitle, onUpgradeClick, children } = props;

  const { data: limits } = useQuery(getAiCourseLimitOptions(), queryClient);
  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();

  const { used, limit } = limits ?? { used: 0, limit: 0 };

  return (
    <div className="mb-3 flex min-h-[35px] items-center justify-between max-sm:mb-1">
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <div className="gap-2">
          <h2 className="relative top-0 mb-1 sm:mb-3 flex-shrink-0 text-2xl sm:text-3xl font-semibold lg:top-1">
            {title}
          </h2>
          {subtitle && <p className="mb-4 text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className="flex flex-row items-center gap-2">
          <a
            href="/ai"
            className="flex max-sm:hidden flex-row items-center gap-2 rounded-lg bg-black px-4 py-1.5 text-sm font-medium text-white"
          >
            <PlusIcon className="h-4 w-4" />
            New
          </a>
        </div>
      </div>
    </div>
  );
}
