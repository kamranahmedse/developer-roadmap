interface TwitterIconProps {
  className?: string;
}

export function TwitterIcon(props: TwitterIconProps) {
  const { className } = props;
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="23" height="23" rx="3" fill="currentColor" />
      <path
        d="M12.9285 10.3522L18.5135 4H17.1905L12.339 9.5144L8.467 4H4L9.8565 12.3395L4 19H5.323L10.443 13.1754L14.533 19H19M5.8005 4.97619H7.833L17.1895 18.0718H15.1565"
        fill="#E5E5E5"
      />
    </svg>
  );
}
