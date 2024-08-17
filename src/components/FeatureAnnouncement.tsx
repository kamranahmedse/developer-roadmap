type FeatureAnnouncementProps = {};

export function FeatureAnnouncement(props: FeatureAnnouncementProps) {
  return (
    <a
      className="rounded-md border border-dashed border-purple-600 px-3 py-1.5 text-purple-400 transition-colors hover:border-purple-400 hover:text-purple-200"
      href="https://www.youtube.com/watch?v=9lS3slfJ0x0"
      target='_blank'
    >
      <span className="relative -top-[1px] mr-1 text-xs font-semibold uppercase text-white">
        New
      </span>{' '}
      <span className={'hidden sm:inline'}>
        Practice your skills with projects
      </span>
      <span className={'inline text-sm sm:hidden'}>
        Build projects to skill up
      </span>
    </a>
  );
}
