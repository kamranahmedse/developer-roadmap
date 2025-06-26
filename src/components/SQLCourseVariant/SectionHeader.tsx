import { cn } from '../../lib/classname';

type SectionHeaderProps = {
  title: string;
  description: string | React.ReactNode;
  className?: string;
};

export function SectionHeader(props: SectionHeaderProps) {
  const { title, description, className } = props;

  return (
    <div className={cn('mx-auto mt-24 w-full text-center', className)}>
      <div className="relative w-full">
        <h4 className="text-2xl font-medium text-zinc-200 md:text-3xl">
          {title}
        </h4>
      </div>
      {typeof description === 'string' ? (
        <p className="mt-2 text-center text-lg text-balance text-zinc-400 md:mt-5 md:text-xl">
          {description}
        </p>
      ) : (
        description
      )}
    </div>
  );
}
