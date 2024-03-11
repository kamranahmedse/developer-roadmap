type AIAnnouncementProps = {};

export function AIAnnouncement(props: AIAnnouncementProps) {
  return (
    <a
      className="rounded-md border border-dashed border-green-600 px-3 py-1.5 text-green-400 transition-colors hover:border-green-400 hover:text-green-200"
      href="/ai"
    >
      <span className="relative -top-[1px] mr-1 text-xs font-semibold uppercase text-white">
        New
      </span>{' '}
      <span className={'hidden sm:inline'}>Generate visual roadmaps with AI</span>
      <span className={'inline text-sm sm:hidden'}>AI Roadmap Generator!</span>
    </a>
  );
}
