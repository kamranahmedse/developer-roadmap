type TeamAnnouncementProps = {};

export function TeamAnnouncement(props: TeamAnnouncementProps) {
  return (
    <a
      className="rounded-md border border-dashed border-purple-700 px-3 py-1.5 text-purple-400 transition-colors hover:border-gray-700 hover:text-white"
      href="/teams"
    >
      <span className="relative -top-[0.5px] mr-1 text-xs font-semibold uppercase text-white">
        New
      </span>{' '}
      <span className={'hidden sm:inline'}>Announcing roadmaps for teams. <span className='font-semibold'>Learn more!</span></span>
      <span className={'inline text-sm sm:hidden'}>Roadmaps for teams!</span>
    </a>
  );
}
