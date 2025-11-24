type RoadmapIconProps = {
  className?: string;
};
export function RoadmapIcon(props: RoadmapIconProps) {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
      <path d="M12 13v8"></path>
      <path d="M12 3v3"></path>
    </svg>
  );
}
