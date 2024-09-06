import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/classname';

type DashboardCardLinkProps = {
  href: string;
  title: string;
  description: string;
  className?: string;
};

export function DashboardCardLink(props: DashboardCardLinkProps) {
  const { href, title, description, className } = props;

  return (
    <a
      className={cn(
        'relative mt-4 flex min-h-[168px] flex-col justify-end rounded-lg border border-gray-300 bg-gray-100 p-4 hover:bg-gray-200',
        className,
      )}
      href={href}
      target="_blank"
    >
      <h4 className="text-xl font-semibold tracking-wide">{title}</h4>
      <p className="mt-1 text-gray-500">{description}</p>
      <ArrowUpRight className="absolute right-3 top-3 size-4" />
    </a>
  );
}
