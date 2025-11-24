import { type ReactNode } from 'react';
import { SectionBadge } from './SectionBadge.tsx';

type RoleRoadmapsProps = {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function RoleRoadmaps(props: RoleRoadmapsProps) {
  const { badge, title, description, children } = props;

  return (
    <div className="bg-linear-to-b from-gray-100 to-white py-5 sm:py-8 md:py-12">
      <div className="container">
        <div className="text-left">
          <SectionBadge title={badge} />
        </div>
        <div className="my-4 sm:my-7 text-left">
          <h2 className="mb-1 text-balance text-xl sm:text-3xl font-semibold">{title}</h2>
          <p className="text-sm sm:text-base text-gray-500">{description}</p>

          <div className="mt-4 sm:mt-7 grid sm:grid-cols-2 md:grid-cols-3 gap-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
