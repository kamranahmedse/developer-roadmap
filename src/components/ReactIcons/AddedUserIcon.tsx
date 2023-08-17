type CheckIconProps = {
  additionalClasses?: string;
};

export function AddedUserIcon(props: CheckIconProps) {
  const { additionalClasses = 'mr-2 w-[20px] h-[20px]' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`relative ${additionalClasses}`}
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M14 19a6 6 0 0 0-12 0" />
      <circle cx="8" cy="9" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}
