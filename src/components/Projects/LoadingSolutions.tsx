export function LoadingSolutions() {
  return (
    <ul className="flex flex-col divide-y divide-transparent min-h-[500px]">
      {new Array(11).fill(0).map((_, index) => (
        <li key={index} className="flex h-[44px] items-center justify-between">
          <span className="flex items-center">
            <span className="block h-[28px] w-[28px] animate-pulse rounded-full bg-gray-200"></span>
            <span
              className={`ml-2 block h-[26px] w-[350px] animate-pulse rounded-full bg-gray-200`}
            ></span>
          </span>
          <span className="flex items-center gap-2">
            <span className={'w-[80px] rounded-full bg-gray-200 animated-pulse h-[26px]'}></span>
            <span className={'w-[113px] rounded-full bg-gray-200 animated-pulse h-[26px]'}></span>
          </span>
        </li>
      ))}
    </ul>
  );
}
