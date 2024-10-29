import { useState } from 'react';
import {
  useDeleteCourseNoteMutation,
  useUpsertCourseNoteMutation,
  type CourseNoteDocument,
} from '../../hooks/use-course-note';
import { NoteContentEditor } from './NoteContentEditor';
import { Loader2 } from 'lucide-react';

type CourseNoteFormProps = {
  courseId: string;
  currentChapterId: string;
  currentLessonId: string;

  note?: CourseNoteDocument;
  onCancelClick?: () => void;
};

export function CourseNoteForm(props: CourseNoteFormProps) {
  const {
    note: defaultNote,
    onCancelClick,
    courseId,
    currentChapterId,
    currentLessonId,
  } = props;

  const [content, setContent] = useState<string>(defaultNote?.content || '');
  const upsertNote = useUpsertCourseNoteMutation(courseId);
  const deleteNote = useDeleteCourseNoteMutation(courseId);

  return (
    <>
      <div className="flex min-h-[41px] items-center justify-between gap-2 border-b border-zinc-700 px-4 py-2 text-sm">
        <button
          className="text-zinc-400 underline-offset-2 hover:text-white hover:underline"
          onClick={onCancelClick}
          disabled={upsertNote.isPending}
        >
          Cancel
        </button>
        <div className="flex items-center gap-2">
          {defaultNote?._id && (
            <button
              className="flex items-center gap-1 text-red-400 underline-offset-2 hover:text-red-500 hover:underline"
              disabled={upsertNote.isPending || deleteNote.isPending}
              onClick={() => {
                deleteNote.mutate(defaultNote?._id, {
                  onSuccess: () => {
                    onCancelClick?.();
                  },
                });
              }}
            >
              Delete
            </button>
          )}
          <button
            className="flex items-center gap-1 text-zinc-400 underline-offset-2 hover:text-white hover:underline disabled:opacity-60"
            onClick={() => {
              upsertNote.mutate(
                {
                  ...(defaultNote?._id ? { id: defaultNote?._id } : {}),
                  chapterId: defaultNote?.chapterId || currentChapterId,
                  lessonId: defaultNote?.lessonId || currentLessonId,
                  content,
                },
                {
                  onSuccess: () => {
                    if (defaultNote?._id) {
                      return;
                    }

                    onCancelClick?.();
                  },
                },
              );
            }}
            disabled={!content || upsertNote.isPending || deleteNote.isPending}
          >
            {upsertNote.isPending && (
              <Loader2 className="size-3 animate-spin stroke-[2.5]" />
            )}
            Save
          </button>
        </div>
      </div>

      <div className="relative grow overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
        <div className="absolute inset-0 flex h-full flex-col justify-stretch">
          <NoteContentEditor
            defaultContent={defaultNote?.content}
            onMount={(editor) => {
              editor?.commands.focus();
              setContent(editor?.storage?.markdown.getMarkdown() || '');
            }}
            onUpdate={(editor) => {
              setContent(editor?.storage?.markdown.getMarkdown() || '');
            }}
          />
        </div>
      </div>
    </>
  );
}
