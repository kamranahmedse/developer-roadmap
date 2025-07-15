type StepCounterProps = {
  step: number;
};

export function StepCounter(props: StepCounterProps) {
  const { step } = props;

  return (
    <span
      className={
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300 text-white'
      }
    >
      {step}
    </span>
  );
}
