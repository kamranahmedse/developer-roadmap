import type { MouseEventHandler } from "react";

type CloseIconProps = {
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement>
};

export function CloseIcon(props: CloseIconProps) {
  const { className, onClick } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      onClick={onClick}
    >
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}
