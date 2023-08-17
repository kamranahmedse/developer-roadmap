type WarningIconProps = {
  additionalClasses?: string;
};

export function WarningIcon(props: WarningIconProps) {
  const { additionalClasses = 'mr-2 top-[0.5px] w-[20px] h-[20px]' } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`relative ${additionalClasses}`}
    >
      <path
        d="M21.7304 18.0002L13.7304 4.00022C13.556 3.69243 13.303 3.43641 12.9973 3.25829C12.6917 3.08017 12.3442 2.98633 11.9904 2.98633C11.6366 2.98633 11.2892 3.08017 10.9835 3.25829C10.6778 3.43641 10.4249 3.69243 10.2504 4.00022L2.25042 18.0002C2.0741 18.3056 1.98165 18.6521 1.98243 19.0047C1.98321 19.3573 2.0772 19.7035 2.25486 20.008C2.43253 20.3126 2.68757 20.5648 2.99411 20.7391C3.30066 20.9133 3.64783 21.0034 4.00042 21.0002H20.0004C20.3513 20.9999 20.6959 20.9072 20.9997 20.7315C21.3035 20.5558 21.5556 20.3033 21.7309 19.9993C21.9062 19.6954 21.9985 19.3506 21.9984 18.9997C21.9983 18.6488 21.9059 18.3041 21.7304 18.0002Z"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 9V13"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 17H12.01"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
