type AIAnnouncementProps = {};

export function FeatureAnnouncement(props: AIAnnouncementProps) {
  return (
    <a
      className="rounded-md border border-dashed border-purple-600 px-3 py-1.5 text-purple-400 transition-colors hover:border-purple-400 hover:text-purple-200"
      href="/community"
    >
      <span className="relative -top-[1px] mr-1 text-xs font-semibold uppercase text-white">
        New
      </span>{' '}
      <span className={'hidden sm:inline'}>
        Explore community made roadmaps
      </span>
      <span className={'inline text-sm sm:hidden'}>
        Community roadmaps explorer!
      </span>
    </a>
  );
}
