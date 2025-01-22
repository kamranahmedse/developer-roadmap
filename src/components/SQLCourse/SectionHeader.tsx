type SectionHeaderProps = {
  title: string;
  description: string | React.ReactNode;
};

export function SectionHeader(props: SectionHeaderProps) {
  const { title, description } = props;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="relative mt-24 w-full">
        <div className="flex items-center gap-6">
          <div className="inline-flex items-center rounded-xl py-2.5">
            <span className="text-3xl font-medium text-zinc-200">{title}</span>
          </div>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-yellow-500/20 to-transparent"></div>
        </div>
      </div>
      {typeof description === 'string' ? (
        <p className="mt-4 text-xl leading-snug text-zinc-400">{description}</p>
      ) : (
        description
      )}
    </div>
  );
}
