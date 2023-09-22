type CheckIconProps = {
  additionalClasses?: string;
};

export function CheckIcon(props: CheckIconProps) {
  const { additionalClasses = 'mr-2 top-[0.5px] w-[20px] h-[20px]' } = props;

  return (
    <svg
      className={`relative ${additionalClasses}`}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
    </svg>
  );
}
