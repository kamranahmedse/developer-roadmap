import { AlertCircleIcon } from 'lucide-react';
import { cn } from '../../lib/classname';

type ChatHistoryErrorProps = {
  error: Error | null;
  className?: string;
};

export function ChatHistoryError(props: ChatHistoryErrorProps) {
  const { error, className } = props;

  return (
    <div
      className={cn(
        'mt-10 flex max-w-md flex-col items-center justify-center text-center',
        className,
      )}
    >
      <AlertCircleIcon className="h-8 w-8 text-red-500" />
      <h3 className="mt-4 text-sm font-medium text-gray-900">
        Something went wrong
      </h3>
      <p className="mt-0.5 text-xs text-balance text-gray-500">
        {error?.message}
      </p>
    </div>
  );
}
