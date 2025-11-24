import type { SVGProps } from 'react';

export function DailyDevIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 18" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="currentColor" fillRule="nonzero">
        <path
          d="M26.633 8.69l-3.424-3.431 1.711-3.43 5.563 5.575c.709.71.709 1.861 0 2.572l-6.847 6.86c-.709.711-1.858.711-2.567 0a1.821 1.821 0 010-2.571l5.564-5.575z"
          fillOpacity="0.64"
        ></path>
        <path d="M21.07.536a1.813 1.813 0 012.568 0l1.283 1.286L9.945 16.83c-.709.71-1.858.71-2.567 0l-1.284-1.287L21.071.536zm-6.418 4.717l-2.567 2.572-3.424-3.43-4.28 4.288 3.424 3.43-1.71 3.43L.531 9.97a1.821 1.821 0 010-2.572L7.378.537A1.813 1.813 0 019.945.535l4.707 4.717z"></path>
      </g>
    </svg>
  );
}
