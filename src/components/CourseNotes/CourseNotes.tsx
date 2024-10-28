import { MessageSquareCode } from 'lucide-react';

export function CourseNotes() {
  return (
    <div className="relative">
      <button className="flex items-center gap-1 rounded-lg border border-zinc-800 px-2 py-1.5 text-sm leading-none disabled:opacity-60">
        <MessageSquareCode className="size-4 stroke-[2.5]" />
        Take Notes
      </button>

      <div className="absolute bottom-full left-0 z-10 flex h-[60dvh] w-[420px] -translate-y-2 flex-col rounded-xl border border-zinc-700 bg-zinc-800 text-white">
        <div className="flex items-center justify-between gap-2 border-b border-zinc-700 px-4 py-2 text-sm">
          <h4 className="text-base font-medium">Course Notes</h4>
          <button className="text-zinc-400 underline-offset-2 hover:text-white hover:underline">
            + New Note
          </button>
        </div>

        <div className="relative grow overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
          <div className="absolute inset-0 flex flex-col divide-y divide-zinc-700">
            <div className="flex flex-col gap-3 p-4">
              <div className="flex max-w-max items-center gap-1 rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-200">
                <a className="underline-offset-2 hover:text-white hover:underline">
                  Date Definition Language
                </a>
                <span className="text-zinc-400">/</span>
                <a className="underline-offset-2 hover:text-white hover:underline">
                  Creating Tabel
                </a>
              </div>

              <div className="course-content prose prose-sm prose-invert line-clamp-3">
                <p>
                  This is an example of a note containing multiple elements.
                  Markdown allows you to easily format text for{' '}
                  <em>documentation</em> and <strong>notes</strong>.
                </p>
                <p>
                  Use <code>console.log()</code> to print messages to the
                  console.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
