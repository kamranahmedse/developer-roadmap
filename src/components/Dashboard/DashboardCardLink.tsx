import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/classname';

type DashboardCardLinkProps = {
  href: string;
  title: string;
  icon: LucideIcon;
  description: string;
  className?: string;
};

export function DashboardCardLink(props: DashboardCardLinkProps) {
  const { href, title, description, icon: Icon, className } = props;

  return (
    <a
      className={cn(
        'relative mt-4 flex min-h-[220px] flex-col justify-end rounded-lg border border-gray-300 bg-gradient-to-br from-white to-gray-50 py-5 px-6 hover:border-gray-400 hover:from-white hover:to-gray-100',
        className,
      )}
      href={href}
      target="_blank"
    >
      <Icon className="mb-4 size-10 text-gray-300" strokeWidth={1.25} />
      <h4 className="text-xl font-semibold tracking-wide">{title}</h4>
      <p className="mt-1 text-gray-500">{description}</p>
      <ArrowUpRight className="absolute right-3 top-3 size-4" />
    </a>
  );
}
