import { cn } from '../../lib/classname';

type CourseInfoCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function CourseInfoCard(props: CourseInfoCardProps) {
  const { title, children, className } = props;

  return (
    <div className={cn('rounded-lg border bg-white p-4 shadow-sm', className)}>
      <h2 className="mb-4 text-xl font-medium">{title}</h2>
      {children}
    </div>
  );
}
