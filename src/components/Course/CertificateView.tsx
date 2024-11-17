import { useEffect, useMemo, useState } from 'react';
import { Rating } from '../Rating/Rating';
import { RateCourseForm } from './RateCourseForm';
import type { ChapterFileType } from '../../lib/course';
import { useCourseProgress } from '../../hooks/use-course';
import { Loader2 } from 'lucide-react';
import { CertificateModal } from './Certificate';
import { useAuth } from '../../hooks/use-auth';
import { DateTime } from 'luxon';

type CertificateViewProps = {
  courseTitle: string;
  chapters: ChapterFileType[];
  currentCourseId: string;
};

export function CertificateView(props: CertificateViewProps) {
  const { currentCourseId, chapters, courseTitle } = props;

  const user = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [showRatingForm, setShowRatingForm] = useState(false);

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
    return (
      allLessonLinks.every((lessonLink) => completeLessonSet.has(lessonLink)) &&
      courseProgress?.completedAt !== null
    );
  }, [allLessonLinks, completeLessonSet, courseProgress]);

  const {
    chapters: chaptersCount,
    lessons: lessonsCount,
    quizzes: quizCount,
    challenges: challengeCount,
  } = useMemo(() => {
    const counts = {
      chapters: 0,
      lessons: 0,
      quizzes: 0,
      challenges: 0,
    };

    for (const chapter of chapters.filter(
      (chapter) => chapter.lessons.length > 0,
    )) {
      counts.chapters += 1;

      for (const lesson of chapter.lessons) {
        if (lesson.frontmatter.type === 'quiz') {
          counts.quizzes += 1;
        }

        if (lesson.frontmatter.type === 'challenge') {
          counts.challenges += 1;
        }

        if (
          ['lesson', 'lesson-challenge', 'lesson-quiz'].includes(
            lesson.frontmatter.type,
          )
        ) {
          counts.lessons += 1;
        }
      }
    }

    return counts;
  }, chapters);

  useEffect(() => {
    if (!courseProgress) {
      return;
    }

    setIsLoading(false);
  }, [courseProgress]);

  useEffect(() => {
    if (!courseProgress) {
      return;
    }

    setRating(courseProgress?.review?.rating || 0);
  }, [courseProgress]);

  return (
    <>
      {showRatingForm && (
        <RateCourseForm
          courseId={currentCourseId}
          rating={rating}
          feedback={courseProgress?.review?.feedback || ''}
          onClose={() => {
            setRating(courseProgress?.review?.rating || 0);
            setShowRatingForm(false);
          }}
        />
      )}

      {showCertificateModal && courseProgress?.completedAt !== null && (
        <CertificateModal
          userName={user?.name || 'N/A'}
          courseName={courseTitle}
          lessonsCount={lessonsCount}
          quizzesCount={quizCount}
          challengesCount={challengeCount}
          onClose={() => {
            setShowCertificateModal(false);
          }}
          issuedDate={DateTime.now().toFormat('yyyy-MM-dd')}
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
              <p className="mt-3 text-center text-lg text-gray-600">
                You finished the course. Download the completion certificate
                below and share it with the world.
              </p>
              <button
                className="mt-8 block rounded-full bg-zinc-700 px-6 py-2.5 font-medium text-white"
                onClick={() => setShowCertificateModal(true)}
              >
                View Certificate
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
            <h1 className="text-4xl font-semibold">Pending completion!</h1>
            <p className="mt-3 text-center text-lg text-gray-600">
              Please complete all the lessons and challenges in the course to
              issue the certificate.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
