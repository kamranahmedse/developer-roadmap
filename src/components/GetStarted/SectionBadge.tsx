type SectionBadgeProps = {
  title: string;
};
export function SectionBadge(props: SectionBadgeProps) {
  const { title } = props;

  return (
    <span className="rounded-full bg-black px-3 py-1 text-sm text-white">
      {title}
    </span>
  );
}
