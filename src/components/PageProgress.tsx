import { useStore } from '@nanostores/preact';
import SpinnerIcon from '../icons/spinner.svg';
import { pageProgressMessage } from '../stores/page';
import { useEffect, useState } from 'preact/hooks';

export interface Props {
  initialMessage: string;
}

export function PageProgress(props: Props) {
  const { initialMessage } = props;
  const [message, setMessage] = useState(initialMessage);

  const $pageProgressMessage = useStore(pageProgressMessage);

  useEffect(() => {
    setMessage($pageProgressMessage);
  }, [$pageProgressMessage]);

  if (!message) {
    return null;
  }

  return (
    <div>
      {/* Tailwind based spinner for full page */}
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white bg-opacity-75">
        <div class="flex  items-center justify-center rounded-md border bg-white px-4 py-2 ">
          <img
            src={SpinnerIcon}
            alt="Loading"
            className="h-4 w-4 animate-spin fill-blue-600 text-gray-200 sm:h-4 sm:w-4"
          />
          <h1 className="ml-2">
            {message}
            <span className="animate-pulse">...</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
