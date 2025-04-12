import { cn } from '../../lib/classname';

type SectionHeaderProps = {
  title: string;
  description: string | React.ReactNode;
  className?: string;
};

export function SectionHeader(props: SectionHeaderProps) {
  const { title, description, className } = props;

  return (
    <div className={cn('mx-auto w-full mt-24 max-w-3xl', className)}>
      <div className="relative w-full">
        <div className="flex items-center gap-6">
          <div className="inline-flex items-center rounded-xl ">
            <span className="text-2xl md:text-3xl font-medium text-zinc-200">{title}</span>
          </div>
          <div className="h-[1px] grow bg-linear-to-r from-yellow-500/20 to-transparent"></div>
        </div>
      </div>
      {typeof description === 'string' ? (
        <p className="mt-2 md:mt-5 text-lg md:text-xl text-zinc-400">{description}</p>
      ) : (
        description
      )}
    </div>
  );
}
