import { Gift } from 'lucide-react';
import { Modal } from '../Modal';
import { formatCommaNumber } from '../../lib/number';
import { billingDetailsOptions } from '../../queries/billing';
import { queryClient } from '../../stores/query-client';
import { useQuery } from '@tanstack/react-query';
import { getAiCourseLimitOptions } from '../../queries/ai-course';

type AILimitsPopupProps = {
  onClose: () => void;
  onUpgrade: () => void;
};

export function AILimitsPopup(props: AILimitsPopupProps) {
  const { onClose, onUpgrade } = props;

  const { data: limits, isLoading } = useQuery(
    getAiCourseLimitOptions(),
    queryClient,
  );

  const { used, limit } = limits ?? { used: 0, limit: 0 };

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);

  const isPaidUser = userBillingDetails?.status === 'active';

  return (
    <Modal
      onClose={onClose}
      wrapperClassName="rounded-xl max-w-xl w-full h-auto"
      bodyClassName="p-6"
      overlayClassName="items-start md:items-center"
    >
      <h2 className="mb-8 text-center text-xl font-semibold">
        Daily AI Limits
      </h2>

      {/* Usage Progress Bar */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium">
            Usage: {formatCommaNumber(used)}&nbsp;/&nbsp;
            {formatCommaNumber(limit)} tokens
          </span>
          <span className="text-sm font-medium">
            {Math.round((used / limit) * 100)}%
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-gray-200">
          <div
            className="h-2.5 rounded-full bg-yellow-500"
            style={{ width: `${Math.min(100, (used / limit) * 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Used Today</p>
            <p className="text-2xl font-bold">{formatCommaNumber(used)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Daily Limit</p>
            <p className="text-2xl font-bold">{formatCommaNumber(limit)}</p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-2">
        <div className="space-y-3 text-gray-600">
          <p className="text-sm">
            Limit resets every 24 hours.{' '}
            {!isPaidUser && 'Consider upgrading for more tokens.'}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto flex flex-col gap-2 pt-4">
        {!isPaidUser && (
          <button
            onClick={onUpgrade}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-yellow-500"
          >
            <Gift className="size-4" />
            Upgrade to Unlimited
          </button>
        )}
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-gray-200 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
