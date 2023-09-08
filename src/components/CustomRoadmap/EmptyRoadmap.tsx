import { CircleSlash } from 'lucide-react';

export function EmptyRoadmap() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center">
        <CircleSlash className="mx-auto h-20 w-20 text-gray-400" />
        <h3 className="mt-4">This roadmap is currently empty.</h3>
      </div>
    </div>
  );
}
