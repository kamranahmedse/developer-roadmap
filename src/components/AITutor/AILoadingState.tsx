import { Loader2 } from 'lucide-react';

type AILoadingStateProps = {
  title: string;
  subtitle?: string;
};

export function AILoadingState(props: AILoadingStateProps) {
  const { title, subtitle } = props;

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-8">
      <div className="relative">
        <Loader2 className="size-12 animate-spin text-gray-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-4 rounded-full bg-white"></div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-900">{title}</p>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
} 