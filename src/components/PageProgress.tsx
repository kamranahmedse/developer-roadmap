import { useStore } from '@nanostores/preact';
import { useIsFirstRender } from '../hooks/use-is-first-render';
import SpinnerIcon from '../icons/spinner.svg';
import { pageLoadingMessage } from '../stores/page';

export interface Props {
  initialMessage: string;
}

export function PageProgress(props: Props) {
  const { initialMessage } = props;

  const isFirstRender = useIsFirstRender();
  const $pageLoadingMessage = useStore(pageLoadingMessage);

  if (!$pageLoadingMessage) {
    if (!initialMessage || !isFirstRender) {
      return null;
    }
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
            {$pageLoadingMessage || initialMessage}
            <span className="animate-pulse">...</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
