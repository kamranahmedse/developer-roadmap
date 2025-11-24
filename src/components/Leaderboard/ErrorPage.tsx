import type { AppError } from '../../api/api';
import { ErrorIcon } from '../ReactIcons/ErrorIcon';

type ErrorPageProps = {
  error: AppError;
};

export function ErrorPage(props: ErrorPageProps) {
  const { error } = props;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-10">
        <div className="flex min-h-[250px] flex-col items-center justify-center px-5 py-3 sm:px-0 sm:py-20">
          <ErrorIcon additionalClasses="mb-4 h-8 w-8 sm:h-14 sm:w-14" />
          <h2 className="mb-1 text-lg font-semibold sm:text-xl">
            Oops! Something went wrong
          </h2>
          <p className="mb-3 text-balance text-center text-xs text-gray-800 sm:text-sm">
            {error?.message || 'An error occurred while fetching'}
          </p>
        </div>
      </div>
    </div>
  );
}
