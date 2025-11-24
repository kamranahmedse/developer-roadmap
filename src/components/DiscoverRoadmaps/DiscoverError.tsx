import { ErrorIcon } from '../ReactIcons/ErrorIcon';

type DiscoverErrorProps = {
  message: string;
};

export function DiscoverError(props: DiscoverErrorProps) {
  const { message } = props;

  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border px-5 py-3 sm:px-0 sm:py-20">
      <ErrorIcon additionalClasses="mb-4 h-8 w-8 sm:h-14 sm:w-14" />
      <h2 className="mb-1 text-lg font-semibold sm:text-xl">
        Oops! Something went wrong
      </h2>
      <p className="mb-3 text-balance text-center text-xs text-gray-800 sm:text-sm">
        {message}
      </p>
    </div>
  );
}
