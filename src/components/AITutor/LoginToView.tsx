import { LockIcon } from 'lucide-react';

import { showLoginPopup } from '../../lib/popup';
import { cn } from '../../lib/classname';

type LoginToViewProps = {
  className?: string;
};

export function LoginToView(props: LoginToViewProps) {
  const { className } = props;

  return (
    <div
      className={cn(
        'mt-8 min-h-[402px] rounded-xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-gray-100/50 p-12 backdrop-blur-sm',
        'flex flex-col items-center justify-center',
        className,
      )}
    >
      <LockIcon className="size-8 stroke-[1.5] text-gray-600" />

      <div className="mt-5 mb-4 flex flex-col items-center gap-0.5 text-center">
        <h3 className="text-xl font-semibold text-gray-700">Login Required</h3>
        <p className="text-sm text-balance leading-relaxed text-gray-500">
          Please login to access the content and all the features of the AI Tutor.
        </p>
      </div>

      <button
        onClick={() => showLoginPopup()}
        className="rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:opacity-80 hover:shadow-md active:scale-[0.98] active:transform"
      >
        Login to Continue
      </button>
    </div>
  );
}
