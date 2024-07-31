import { CheckIcon } from '../ReactIcons/CheckIcon';
import { FeatureAnnouncement } from '../FeatureAnnouncement.tsx';

type EmptyProgressProps = {
  title?: string;
  message?: string;
};

export function EmptyProgress(props: EmptyProgressProps) {
  const {
    title = 'Start learning ..',
    message = 'Your progress and favorite roadmaps will show up here.',
  } = props;

  return (
    <div className="relative flex min-h-full flex-col items-start justify-center py-6 sm:items-center">
      <h2
        className={'mb-1.5 flex items-center text-lg text-gray-200 sm:text-2xl'}
      >
        <CheckIcon additionalClasses="mr-2 top-[0.5px] w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" />
        {title}
      </h2>
      <p className={'text-sm text-gray-400 sm:text-base'}>{message}</p>

      <p className="mt-5">
        <FeatureAnnouncement />
      </p>
    </div>
  );
}
