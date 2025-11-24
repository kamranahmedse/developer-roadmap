import { isMobileScreen } from '../../lib/is-mobile.ts';

export function LoadingSolutions() {
  const totalCount = isMobileScreen() ? 3 : 11;

  const loadingRow = (
    <li className="flex min-h-[78px] animate-pulse flex-wrap items-center justify-between overflow-hidden rounded-md bg-gray-200 sm:min-h-[44px] sm:animate-none sm:rounded-none sm:bg-transparent">
      <span className="flex items-center">
        <span className="block h-[28px] w-[28px] animate-pulse rounded-full bg-gray-200"></span>
        <span
          className={`ml-2 block h-[26px] w-[350px] animate-pulse rounded-full bg-gray-200`}
        ></span>
      </span>
      <span className="flex items-center gap-2">
        <span
          className={
            'animated-pulse h-[26px] w-[80px] rounded-full bg-gray-200'
          }
        ></span>
        <span
          className={
            'animated-pulse h-[26px] w-[113px] rounded-full bg-gray-200'
          }
        ></span>
      </span>
    </li>
  );

  return (
    <ul className="flex min-h-[500px] flex-col gap-2 divide-y sm:gap-0">
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
    </ul>
  );
}
