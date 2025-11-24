import { Fragment } from 'react';
import { CheckIcon } from './ReactIcons/CheckIcon';

type StepperStep = {
  label: string;
  onClick?: () => void;
};

type StepperProps = {
  activeIndex: number;
  completeSteps: number[];
  steps: StepperStep[];
};

export function Stepper(props: StepperProps) {
  const { steps, activeIndex = 0, completeSteps = [] } = props;

  return (
    <ol className="flex w-full items-center text-gray-500" key="stepper">
      {steps.map((step, stepCounter) => {
        const isComplete = completeSteps.includes(stepCounter);
        const isActive = activeIndex === stepCounter;
        const isLast = stepCounter === steps.length - 1;

        return (
          <Fragment key={stepCounter}>
            <li
              className={`flex items-center ${
                isComplete || isActive ? 'text-black' : 'text-gray-400'
              }`}
            >
              {isComplete && (
                <CheckIcon
                  additionalClasses={'mr-2 top-[0.5px] w-[18px] h-[18px]'}
                />
              )}
              {!isComplete && (
                <span className="mr-2 font-semibold">{stepCounter + 1}</span>
              )}
              <span className="flex grow">{step.label}</span>
            </li>
            {!isLast && (
              <li className={'mx-5 flex grow rounded-md bg-gray-200'}>
                <span className={'h-1 w-full'} />
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
