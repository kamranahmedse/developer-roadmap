import { Loader2Icon } from 'lucide-react';

type LoadingChipProps = {
  message?: string;
};

export function LoadingChip(props: LoadingChipProps) {
  const { message = 'Please wait...' } = props;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-3 text-sm">
      <Loader2Icon className="size-4 animate-spin text-gray-400" />
      <span>{message}</span>
    </div>
  );
}
