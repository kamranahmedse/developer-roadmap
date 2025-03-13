import {
  generateAiCourseStructure,
  readStream,
  type AiCourse,
} from '../lib/ai';
import { queryClient } from '../stores/query-client';
import { getAiCourseLimitOptions } from '../queries/ai-course';

type GenerateCourseOptions = {
  term: string;
  difficulty: string;
  slug?: string;
  isForce?: boolean;
  onCourseIdChange?: (courseId: string) => void;
  onCourseSlugChange?: (courseSlug: string) => void;
  onCourseChange?: (course: AiCourse, rawData: string) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onError?: (error: string) => void;
};

export async function generateCourse(options: GenerateCourseOptions) {
  const {
    term,
    slug,
    difficulty,
    onCourseIdChange,
    onCourseSlugChange,
    onCourseChange,
    onLoadingChange,
    onError,
    isForce = false,
  } = options;

  onLoadingChange?.(true);
  onCourseChange?.(
    {
      title: '',
      modules: [],
      difficulty: '',
    },
    '',
  );
  onError?.('');

  try {
    let response = null;

    if (slug && isForce) {
      response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-regenerate-ai-course/${slug}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );
    } else {
      response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-course`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keyword: term,
            difficulty,
            isForce,
          }),
          credentials: 'include',
        },
      );
    }

    if (!response.ok) {
      const data = await response.json();
      console.error(
        'Error generating course:',
        data?.message || 'Something went wrong',
      );
      onLoadingChange?.(false);
      onError?.(data?.message || 'Something went wrong');
      return;
    }

    const reader = response.body?.getReader();

    if (!reader) {
      console.error('Failed to get reader from response');
      onError?.('Something went wrong');
      onLoadingChange?.(false);
      return;
    }

    const COURSE_ID_REGEX = new RegExp('@COURSEID:(\\w+)@');
    const COURSE_SLUG_REGEX = new RegExp(/@COURSESLUG:([\w-]+)@/);

    await readStream(reader, {
      onStream: (result) => {
        if (result.includes('@COURSEID') || result.includes('@COURSESLUG')) {
          const courseIdMatch = result.match(COURSE_ID_REGEX);
          const courseSlugMatch = result.match(COURSE_SLUG_REGEX);
          const extractedCourseId = courseIdMatch?.[1] || '';
          const extractedCourseSlug = courseSlugMatch?.[1] || '';

          if (extractedCourseSlug) {
            window.history.replaceState(
              {
                courseId: extractedCourseId,
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

          onCourseIdChange?.(extractedCourseId);
          onCourseSlugChange?.(extractedCourseSlug);
        }

        try {
          const aiCourse = generateAiCourseStructure(result);
          onCourseChange?.(
            {
              ...aiCourse,
              difficulty: difficulty || '',
            },
            result,
          );
        } catch (e) {
          console.error('Error parsing streamed course content:', e);
        }
      },
      onStreamEnd: (result) => {
        result = result
          .replace(COURSE_ID_REGEX, '')
          .replace(COURSE_SLUG_REGEX, '');
        onLoadingChange?.(false);
        queryClient.invalidateQueries(getAiCourseLimitOptions());
      },
    });
  } catch (error: any) {
    onError?.(error?.message || 'Something went wrong');
    console.error('Error in course generation:', error);
    onLoadingChange?.(false);
  }
}
