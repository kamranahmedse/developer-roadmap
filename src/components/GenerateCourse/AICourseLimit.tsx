import { useQuery } from '@tanstack/react-query';
import {
  BookIcon,
  BookOpenIcon,
  MessageCircleQuestionIcon,
  ChevronDownIcon,
  ClockIcon,
  BotIcon,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { billingDetailsOptions } from '../../queries/billing';
import { getPercentage } from '../../helper/number';

export function AICourseLimit() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { data: limits, isLoading } = useQuery(
    getAiCourseLimitOptions(),
    queryClient,
  );

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);

  if (isLoading || !limits || isBillingDetailsLoading || !userBillingDetails) {
    return (
      <div className="h-[38px] w-[208.09px] animate-pulse rounded-lg border border-gray-200 bg-gray-200"></div>
    );
  }

  const { used, limit } = limits;

  const totalPercentage = getPercentage(used, limit);

  return (
    <>
      <div className="relative flex h-full min-h-[38px] cursor-pointer items-center overflow-hidden rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50">
        <span className="relative z-10">
          {totalPercentage}% of the daily limit used
        </span>
        <div
          className="absolute inset-0 h-full bg-gray-50"
          style={{
            width: `${totalPercentage}%`,
          }}
        ></div>
      </div>

      {userBillingDetails.status === 'none' && (
        <>
          <button
            className="ml-2 rounded-md border border-gray-200 px-2 py-1 text-sm hover:bg-gray-50"
            onClick={() => setShowUpgradeModal(true)}
          >
            Upgrade
          </button>

          {showUpgradeModal && (
            <UpgradeAccountModal onClose={() => setShowUpgradeModal(false)} />
          )}
        </>
      )}
    </>
  );
}
