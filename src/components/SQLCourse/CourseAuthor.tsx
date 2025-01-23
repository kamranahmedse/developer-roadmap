export function CourseAuthor() {
  return (
    <div className="mt-8 w-full max-w-3xl space-y-4">
      <div className="flex flex-row items-center gap-5">
        <img
          src="https://github.com/kamranahmedse.png"
          className="size-16 rounded-full bg-yellow-500/10"
        />
        <div className="flex flex-col">
          <span className="text-2xl font-medium text-zinc-200">
            Kamran Ahmed
          </span>
          <span className="text-lg text-zinc-500">Software Engineer</span>
        </div>
      </div>
    </div>
  );
}
