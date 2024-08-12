export function LoadingSolutions() {
  return (
    <ul className="flex flex-col gap-2">
      {new Array(21).fill(0).map((_, index) => (
        <li
          key={index}
          className="h-[76px] animate-pulse rounded-md border bg-gray-200"
        />
      ))}
    </ul>
  );
}
