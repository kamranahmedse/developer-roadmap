import { Badge } from '../Badge.tsx';

export function ProjectCard() {
  return (
    <a
      href="#"
      className="flex flex-col rounded-md border bg-white p-3 transition-colors hover:border-gray-300 hover:bg-gray-50"
    >
      <span className="flex justify-between gap-1.5">
        <Badge variant={'yellow'} text={'Beginner'} />
        <Badge variant={'grey'} text={'API'} />
      </span>
      <span className="mb-1 mt-2.5 font-medium">Bank Application</span>
      <span className="text-sm text-gray-500">
        Create a simple CLI to collect and calculate the taxes.
      </span>
    </a>
  );
}
