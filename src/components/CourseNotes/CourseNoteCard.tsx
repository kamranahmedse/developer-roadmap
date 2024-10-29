import { useMemo } from 'react';
import { markdownToHtml } from '../../lib/markdown';
import { ArrowRight } from 'lucide-react';

type CourseNoteCardProps = {
  courseId: string;
  chapterId: string;
  chapterTitle: string;

  lessonId: string;
  lessonTitle: string;

  content: string;

  onLearnMoreClick: () => void;
};

export function CourseNoteCard(props: CourseNoteCardProps) {
  const {
    chapterTitle,
    lessonTitle,
    content,
    courseId,
    chapterId,
    lessonId,
    onLearnMoreClick,
  } = props;

  const markdownHTML = useMemo(() => {
    const html = markdownToHtml(content, false);
    // FIXME: Sanitize html before returning

    return html;
  }, [content]);

  return (
    <div className="relative flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex max-w-max items-center gap-1 rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-200">
          <a className="underline-offset-2 hover:text-white hover:underline">
            {chapterTitle}
          </a>
          <span className="text-zinc-400">/</span>
          <a className="underline-offset-2 hover:text-white hover:underline">
            {lessonTitle}
          </a>
        </div>

        <button
          className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
          onClick={onLearnMoreClick}
        >
          Learn More <ArrowRight className="size-4" />
        </button>
      </div>

      <div
        className="course-content prose prose-sm prose-invert line-clamp-3"
        // FIXME: Sanitize content before rendering
        dangerouslySetInnerHTML={{ __html: markdownHTML }}
      ></div>
    </div>
  );
}
