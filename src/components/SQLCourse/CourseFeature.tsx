import type { LucideIcon } from 'lucide-react';

type CourseFeatureProps = {
  title: string;
  icon: LucideIcon;
};

export function CourseFeature(props: CourseFeatureProps) {
  const { title, icon: Icon } = props;

  const description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.';

  return (
    <div className="relative">
      <div className="flex items-center space-x-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-left">
        <Icon />
        <span>{title}</span>
      </div>
    </div>
  );
}
