import { useEffect, useMemo, useState } from 'react';
import { Rating } from '../Rating/Rating';
import { RateCourseForm } from './RateCourseForm';
import type { ChapterFileType } from '../../lib/course';
import { useCourseProgress } from '../../hooks/use-course';
import { Loader2 } from 'lucide-react';

type CertificateViewProps = {
  chapters: ChapterFileType[];
  currentCourseId: string;
};

export function CertificateView(props: CertificateViewProps) {
  const { currentCourseId, chapters } = props;

  const [isLoading, setIsLoading] = useState(true);

  const { data: courseProgress, status } = useCourseProgress(currentCourseId);

  const completeLessonSet = useMemo(
    () =>
      new Set(
        (courseProgress?.completed || []).map(
          (l) => `/learn/${currentCourseId}/${l.chapterId}/${l.lessonId}`,
        ),
      ),
    [courseProgress],
  );

  const allLessonLinks = useMemo(() => {
    const lessons: string[] = [];
    for (const chapter of chapters) {
      for (const lesson of chapter.lessons) {
        lessons.push(`/learn/${currentCourseId}/${chapter.id}/${lesson.id}`);
      }
    }

    return lessons;
  }, [chapters]);

  const isCourseCompleted = useMemo(() => {
    return allLessonLinks.every((lessonLink) =>
      completeLessonSet.has(lessonLink),
    );
  }, [allLessonLinks, completeLessonSet]);

  const [rating, setRating] = useState(0);
  const [showRatingForm, setShowRatingForm] = useState(false);

  useEffect(() => {
    if (!courseProgress) {
      return;
    }

    setIsLoading(false);
  }, [courseProgress]);

  return (
    <>
      {showRatingForm && (
        <RateCourseForm
          defaultRating={rating}
          onClose={() => {
            setRating(0);
            setShowRatingForm(false);
          }}
        />
      )}

      <div className="mx-auto flex max-w-md flex-col items-center justify-center">
        {isLoading && (
          <Loader2 className="size-8 animate-spin stroke-[2.5] text-zinc-200" />
        )}

        {isCourseCompleted && !isLoading && (
          <>
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-semibold">Congratulations!</h1>
              <p className="mt-3 text-center text-lg text-zinc-200">
                You finished the course. Download the completion certificate
                below and share it with the world.
              </p>
              <button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 block rounded-full bg-zinc-700 px-6 py-2.5 font-medium text-white"
                >
                  Download Certificate
                </a>
              </button>
            </div>

            <div className="mt-24 flex flex-col items-center gap-3">
              <Rating
                key={rating}
                rating={rating}
                onRatingChange={(rating) => {
                  setRating(rating);
                  setShowRatingForm(true);
                }}
                starSize={36}
              />
              <span>Rate your experience</span>
            </div>
          </>
        )}

        {!isCourseCompleted && !isLoading && (
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-semibold">Almost there!</h1>
            <p className="mt-3 text-center text-lg text-zinc-200">
              Complete the course to download the certificate and rate your
              experience.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
