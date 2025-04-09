import { type LucideIcon } from 'lucide-react';

type AITutorTallMessageProps = {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  buttonText?: string;
  onButtonClick?: () => void;
};

export function AITutorTallMessage(props: AITutorTallMessageProps) {
  const { title, subtitle, icon: Icon, buttonText, onButtonClick } = props;

  return (
    <div className="flex min-h-full flex-grow flex-col items-center justify-center rounded-lg">
      <Icon className="size-12 text-gray-300" />
      <div className="my-4 text-center">
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        {subtitle && <p className="text-base text-gray-600">{subtitle}</p>}
      </div>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:opacity-80"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
