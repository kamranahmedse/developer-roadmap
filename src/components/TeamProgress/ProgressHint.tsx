import { useRef } from 'preact/hooks';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
import { CloseIcon } from '../ReactIcons/CloseIcon';

type ProgressHintProps = {
  onClose: () => void;
};

export function ProgressHint(props: ProgressHintProps) {
  const { onClose } = props;
  const containerEl = useRef<HTMLDivElement>(null);

  useOutsideClick(containerEl, onClose);
  useKeydown('Escape', () => {
    onClose();
  });

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50">
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className="relative w-full max-w-lg rounded-md bg-yellow-50 px-3 py-3 text-gray-500"
          ref={containerEl}
        >
          <span className="mb-1.5 block text-xs font-medium uppercase text-green-600">
            Update Progress
          </span>
          <p className="text-sm">Use the keyboard shortcuts listed below.</p>

          <ul className="mb-1.5 mt-3 flex flex-col gap-1">
            <li className="text-sm leading-loose">
              <kbd className="rounded-md bg-gray-900 px-2 py-1.5 text-xs text-white">
                Right Mouse Click
              </kbd>{' '}
              to mark as Done.
            </li>
            <li className="text-sm leading-loose">
              <kbd className="rounded-md bg-gray-900 px-2 py-1.5 text-xs text-white">
                Shift
              </kbd>{' '}
              +{' '}
              <kbd className="rounded-md bg-gray-900 px-2 py-1.5 text-xs text-white">
                Click
              </kbd>{' '}
              to mark as in progress.
            </li>
            <li className="text-sm leading-loose">
              <kbd className="rounded-md bg-gray-900 px-2 py-1.5 text-xs text-white">
                Option / Alt
              </kbd>{' '}
              +{' '}
              <kbd className="rounded-md bg-gray-900 px-2 py-1.5 text-xs text-white">
                Click
              </kbd>{' '}
              to mark as skipped.
            </li>
          </ul>
          <button
            type="button"
            className="absolute right-1.5 top-1.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-yellow-200 hover:text-yellow-900"
            onClick={onClose}
          >
            <CloseIcon />
            <span class="sr-only">Close modal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
