import { useEffect, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { generateAiCourseStructure, type AiCourse } from '../../lib/ai';
import { readAICourseStream } from '../../helper/read-stream';
import { AICourseContent } from './AICourseContent';

type GenerateAICourseProps = {};

export function GenerateAICourse(props: GenerateAICourseProps) {
  const [term, setTerm] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [courseId, setCourseId] = useState('');
  const [courseSlug, setCourseSlug] = useState('');
  const [course, setCourse] = useState<AiCourse>({
    title: '',
    modules: [],
    difficulty: '',
  });

  useEffect(() => {
    if (term || difficulty) {
      return;
    }

    const params = getUrlParams();
    const paramsTerm = params?.term;
    const paramsDifficulty = params?.difficulty;
    if (!paramsTerm || !paramsDifficulty) {
      return;
    }

    setTerm(paramsTerm);
    setDifficulty(paramsDifficulty);
    generateCourse({ term: paramsTerm, difficulty: paramsDifficulty });
  }, [term, difficulty]);

  const generateCourse = async (options: {
    term: string;
    difficulty: string;
  }) => {
    const { term, difficulty } = options;

    if (!isLoggedIn()) {
      setIsLoading(false);
      setError('You must be logged in to generate a course');
      showLoginPopup();
      return;
    }

    setIsLoading(true);
    setCourse({
      title: '',
      modules: [],
      difficulty: '',
    });
    setError('');

    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-course`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keyword: term,
            difficulty,
          }),
          credentials: 'include',
        },
      );

      if (!response.ok) {
        const data = await response.json();
        console.error(
          'Error generating course:',
          data?.message || 'Something went wrong',
        );
        setIsLoading(false);
        setError(data?.message || 'Something went wrong');
        return;
      }

      const reader = response.body?.getReader();

      if (!reader) {
        console.error('Failed to get reader from response');
        setError('Something went wrong');
        setIsLoading(false);
        return;
      }

      const COURSE_ID_REGEX = new RegExp('@COURSEID:(\\w+)@');
      const COURSE_SLUG_REGEX = new RegExp(/@COURSESLUG:([\w-]+)@/);

      await readAICourseStream(reader, {
        onStream: (result) => {
          if (result.includes('@COURSEID') || result.includes('@COURSESLUG')) {
            const courseIdMatch = result.match(COURSE_ID_REGEX);
            const courseSlugMatch = result.match(COURSE_SLUG_REGEX);
            const extractedCourseId = courseIdMatch?.[1] || '';
            const extractedCourseSlug = courseSlugMatch?.[1] || '';

            if (extractedCourseSlug) {
              window.history.replaceState(
                {
                  courseId,
                  courseSlug: extractedCourseSlug,
                  term,
                  difficulty,
                },
                '',
                `${origin}/ai-tutor/${extractedCourseSlug}`,
              );
            }

            result = result
              .replace(COURSE_ID_REGEX, '')
              .replace(COURSE_SLUG_REGEX, '');

            setCourseId(extractedCourseId);
            setCourseSlug(extractedCourseSlug);
          }

          try {
            const aiCourse = generateAiCourseStructure(result);
            setCourse({
              ...aiCourse,
              difficulty: difficulty || '',
            });
          } catch (e) {
            console.error('Error parsing streamed course content:', e);
          }
        },
        onStreamEnd: (result) => {
          result = result
            .replace(COURSE_ID_REGEX, '')
            .replace(COURSE_SLUG_REGEX, '');
          setIsLoading(false);
        },
      });
    } catch (error: any) {
      setError(error?.message || 'Something went wrong');
      console.error('Error in course generation:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const { courseId, courseSlug, term, difficulty } = e.state || {};
      if (!courseId || !courseSlug) {
        window.location.reload();
        return;
      }

      setCourseId(courseId);
      setCourseSlug(courseSlug);
      setTerm(term);
      setDifficulty(difficulty);

      setIsLoading(true);
      generateCourse({ term, difficulty }).finally(() => {
        setIsLoading(false);
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <AICourseContent
      courseSlug={courseSlug}
      course={course}
      isLoading={isLoading}
      error={error}
    />
  );
}
