import { AlertTriangle, type LucideIcon } from 'lucide-react';

export type BillingWarningProps = {
  icon?: LucideIcon;
  message: string;
  onButtonClick?: () => void;
  buttonText?: string;
  isLoading?: boolean;
};

export function BillingWarning(props: BillingWarningProps) {
  const {
    message,
    onButtonClick,
    buttonText,
    isLoading,
    icon: Icon = AlertTriangle,
  } = props;

  return (
    <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-600">
      <Icon className="h-5 w-5" />
      <span>
        {message}
        {buttonText && (
          <button
            disabled={isLoading}
            onClick={() => {
              onButtonClick?.();
            }}
            className="font-semibold underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-50 ml-0.5"
          >
            {buttonText}
          </button>
        )}
      </span>
    </div>
  );
}
