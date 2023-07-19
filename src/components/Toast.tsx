import { useStore } from '@nanostores/preact';
import { ToastMessage, ToastType, $toastMessage } from '../stores/toast';
import { useEffect, useState } from 'preact/hooks';
import CloseIcon from '../icons/close.svg';

export interface Props {}

export function Toaster(props: Props) {
  const [message, setMessage] = useState<ToastMessage | undefined>(undefined);
  const toastMessage = useStore($toastMessage);

  const styles: Record<ToastType, string> = {
    error: 'bg-red-500 hover:bg-[rgb(239,68,68)] border-white text-white',
    success: 'bg-white hover:bg-gray-100 border-gray-200 text-black',
    info: 'bg-orange-500 hover:bg-orange-600 border-orange-200 text-white',
  };

  useEffect(() => {
    if (toastMessage === undefined) {
      return;
    }

    setMessage(toastMessage);

    const removeMessage = setTimeout(() => {
      setMessage(undefined);
    }, 5000);

    return () => {
      clearTimeout(removeMessage);
    };
  }, [toastMessage]);

  if (!message) {
    return null;
  }

  return (
    <div>
      <div className="fixed bottom-4 left-0 z-50 flex w-full animate-fade-slide-up items-center justify-center">
        <div
          className={`group relative flex w-full min-w-0 max-w-md items-center rounded-md border p-4 pr-6 shadow-md ${
            styles[message?.type]
          }`}
        >
          <div>{message?.message}</div>
          <button
            type="button"
            className="absolute right-2.5 top-2 ml-auto hidden items-center rounded-lg bg-transparent p-1.5 text-sm text-white hover:bg-white/20 group-hover:inline-flex"
            onClick={() => setMessage(undefined)}
          >
            <img alt={'close'} src={CloseIcon} className="h-4 w-4" />
            <span class="sr-only">Close toast</span>
          </button>
        </div>
      </div>
    </div>
  );
}
