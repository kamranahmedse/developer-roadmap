import { CheckIcon } from './CheckIcon';

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
        <div className="relative flex min-h-full flex-col items-start sm:items-center justify-center py-6">
            <h2 className={'mb-1 flex items-center text-lg sm:text-2xl text-gray-200'}>
                <CheckIcon additionalClasses='mr-2 top-[0.5px] w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]' />
                Start learning ..
            </h2>
            <p className={'text-gray-400 text-sm sm:text-base'}>{message}</p>
        </div>
    );
}
