type ChevronDownIconProps = {
  className?: string;
};

export function ChevronDownIcon(props: ChevronDownIconProps) {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className={className}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
