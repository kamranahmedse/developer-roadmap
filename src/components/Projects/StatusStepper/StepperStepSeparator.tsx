import { cn } from '../../../lib/classname.ts';

type StepperStepSeparatorProps = {
  isActive: boolean;
};

export function StepperStepSeparator(props: StepperStepSeparatorProps) {
  const { isActive } = props;

  return (
    <hr
      className={cn('flex-grow hidden sm:flex border border-gray-300', {
        'border-green-500': isActive,
      })}
    />
  );
}
