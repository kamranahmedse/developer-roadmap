import { useStore } from '@nanostores/react';
import { pageProgressMessage } from '../stores/page';
import { useEffect, useState } from 'react';
import { Spinner } from './ReactIcons/Spinner';

export interface Props {
  initialMessage: string;
}

export function PageProgress(props: Props) {
  const { initialMessage } = props;
  const [message, setMessage] = useState(initialMessage);

  const $pageProgressMessage = useStore(pageProgressMessage);

  useEffect(() => {
    if ($pageProgressMessage === undefined) {
      return;
    }

    setMessage($pageProgressMessage);
  }, [$pageProgressMessage]);

  if (!message) {
    return null;
  }

  return (
    <div>
      {/* Tailwind based spinner for full page */}
      <div className="fixed left-0 top-0 z-100 flex h-full w-full items-center justify-center bg-white/75">
        <div className="flex  items-center justify-center rounded-md border bg-white px-4 py-2 ">
          <Spinner
            className="h-4 w-4 sm:h-4 sm:w-4"
            outerFill="#e5e7eb"
            innerFill="#2563eb"
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
