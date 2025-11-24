interface LinkedInIconProps {
  className?: string;
}

export function LinkedInIcon(props: LinkedInIconProps) {
  const { className } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_2344_20)">
        <path
          d="M0 0V24H24V0H0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.397 7.179 20 6.988 20 12.241V19Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_2344_20">
          <rect width="24" height="24" rx="2" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
