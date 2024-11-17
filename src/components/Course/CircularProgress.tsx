export function CircularProgress({
  percentage,
  children,
  isVisible = true,
}: {
  percentage: number;
  children: React.ReactNode;
  isVisible?: boolean;
}) {
  const circumference = 2 * Math.PI * 13;
  const strokeDasharray = `${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex h-[28px] w-[28px] items-center justify-center">
      {isVisible && (
        <svg className="absolute h-full w-full -rotate-90">
          <circle
            cx="14"
            cy="14"
            r="13"
            stroke="currentColor"
            strokeWidth="1.75"
            fill="none"
            className="text-green-600"
            style={{
              strokeDasharray,
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.3s ease',
            }}
          />
        </svg>
      )}
      {children}
    </div>
  );
}
