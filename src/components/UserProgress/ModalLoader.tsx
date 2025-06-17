import { ErrorIcon } from '../ReactIcons/ErrorIcon';
import { Spinner } from '../ReactIcons/Spinner';

type ModalLoaderProps = {
  isLoading: boolean;
  error?: string;
  text: string;
};

export function ModalLoader(props: ModalLoaderProps) {
  const { isLoading, text, error } = props;

  return (
    <div className="fixed top-0 right-0 left-0 z-100 h-full items-center justify-center overflow-x-hidden overflow-y-auto overscroll-contain bg-black/50">
      <div className="relative mx-auto flex h-full w-full items-center justify-center">
        <div className="popup-body relative rounded-lg bg-white p-5 shadow-sm">
          <div className="flex items-center">
            {isLoading && (
              <>
                <Spinner className="h-6 w-6" isDualRing={false} />
                <span className="ml-3 text-lg font-semibold">
                  {text || 'Loading...'}
                </span>
              </>
            )}

            {error && (
              <>
                <ErrorIcon additionalClasses="h-6 w-6 text-red-500" />
                <span className="ml-3 text-lg font-semibold">{error}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
