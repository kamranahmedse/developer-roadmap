import type { SVGProps } from 'react';
import React from 'react';

export function ConstructionEmoji(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill="#ffcc4d"
        d="M36 15a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z"
      ></path>
      <path
        fill="#292f33"
        d="M6 3H4a4 4 0 0 0-4 4v2zm6 0L0 15c0 1.36.682 2.558 1.72 3.28L17 3zM7 19h5L28 3h-5zm16 0L35.892 6.108A4 4 0 0 0 33.64 3.36L18 19zm13-4v-3l-7 7h3a4 4 0 0 0 4-4"
      ></path>
      <path fill="#99aab5" d="M4 19h5v14H4zm23 0h5v14h-5z"></path>
    </svg>
  );
}
