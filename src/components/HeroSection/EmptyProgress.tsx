import { CheckIcon } from './CheckIcon';

type EmptyProgressProps = {
  title?: string;
  message?: string;
};

export function EmptyProgress(props: EmptyProgressProps) {
  const {
    title = 'Start learning ..',
    message = 'Your progress and favorite roadmaps will appear here',
  } = props;

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center">
      <h2 className={'mb-1 flex items-center text-2xl text-gray-200'}>
        <CheckIcon />
        Start learning ..
      </h2>
      <p className={'text-gray-400'}>{message}</p>
    </div>
  );
}
