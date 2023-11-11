type TwitterIconProps = {
  className?: string;
};

export function TwitterIcon(props: TwitterIconProps) {
  const { className } = props;

  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.9285 6.35221L14.5135 0H13.1905L8.339 5.5144L4.467 0H0L5.8565 8.33955L0 15H1.323L6.443 9.17535L10.533 15H15M1.8005 0.976187H3.833L13.1895 14.0718H11.1565"
        fill="currentColor"
      />
    </svg>
  );
}
