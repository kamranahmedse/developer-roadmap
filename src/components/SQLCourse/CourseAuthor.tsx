export function CourseAuthor() {
  return (
    <div className="mt-8 w-full max-w-3xl space-y-4">
      <div className="flex flex-row items-center gap-5">
        <img
          src="https://github.com/kamranahmedse.png"
          className="size-12 rounded-full bg-yellow-500/10 md:size-16"
        />
        <a
          href="https://twitter.com/kamrify"
          target="_blank"
          className="flex flex-col"
        >
          <span className="text-lg font-medium text-zinc-200 md:text-2xl">
            Kamran Ahmed
          </span>
          <span className="text-sm text-zinc-500 md:text-lg">
            Software Engineer
          </span>
        </a>
      </div>
    </div>
  );
}
