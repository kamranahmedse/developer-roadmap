import type { MouseEventHandler } from "react";

type TipsIconProps = {
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement>
};

export function TipsIcon(props: TipsIconProps) {
  const { className, onClick } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
      className={className}
      onClick={onClick}
    >
      <path fill="currentColor"
        d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2m-2-1h8v-2H5zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27c-1.11-.64-3.77-2.68-3.77-6.5C1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5m4.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94z" />
    </svg>
  );
}
