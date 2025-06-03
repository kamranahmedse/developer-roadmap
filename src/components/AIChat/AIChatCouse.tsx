import { SquareArrowOutUpRightIcon } from 'lucide-react';

type AIChatCourseType = {
  keyword: string;
  difficulty: string;
};

function parseAIChatCourse(content: string): AIChatCourseType | null {
  const courseKeywordRegex = /<keyword>(.*?)<\/keyword>/;
  const courseKeyword = content.match(courseKeywordRegex)?.[1]?.trim();
  if (!courseKeyword) {
    return null;
  }

  const courseDifficultyRegex = /<difficulty>(.*?)<\/difficulty>/;
  const courseDifficulty = content.match(courseDifficultyRegex)?.[1]?.trim();
  if (!courseDifficulty) {
    return null;
  }

  return { keyword: courseKeyword, difficulty: courseDifficulty || 'beginner' };
}

type AIChatCourseProps = {
  content: string;
};

export function AIChatCourse(props: AIChatCourseProps) {
  const { content } = props;

  const course = parseAIChatCourse(content);
  if (!course) {
    return null;
  }

  const courseSearchUrl = `/ai/search?term=${course?.keyword}&difficulty=${course?.difficulty}`;

  return (
    <div className="relative my-6 flex flex-wrap gap-1 first:mt-0 last:mb-0">
      <a
        href={courseSearchUrl}
        target="_blank"
        key={course?.keyword}
        className="group flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-left text-sm text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100"
      >
        {course?.keyword}
        <SquareArrowOutUpRightIcon className="size-3.5 text-gray-400 transition-transform group-hover:text-gray-600" />
      </a>
    </div>
  );
}
