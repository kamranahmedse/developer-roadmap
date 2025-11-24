import { CalendarIcon, ClipboardCheck } from 'lucide-react';
import { cn } from '../../lib/classname';
import { getRelativeTimeString } from '../../lib/date';
import type { AIQuizDocument } from '../../queries/ai-quiz';
import { AIQuizActions } from './AIQuizActions';

type AIQuizCardProps = {
  quiz: Omit<AIQuizDocument, 'content' | 'questionAndAnswers'>;
  variant?: 'row' | 'column';
  showActions?: boolean;
};

export function AIQuizCard(props: AIQuizCardProps) {
  const { quiz, variant = 'row', showActions = true } = props;

  const updatedAgo = getRelativeTimeString(quiz?.updatedAt);

  return (
    <div className="relative flex flex-grow">
      <a
        href={`/ai/quiz/${quiz.slug}`}
        className={cn(
          'group relative flex h-full w-full gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-gray-300 hover:bg-gray-50 sm:gap-4',
          variant === 'column' && 'flex-col',
          variant === 'row' && 'sm:flex-col sm:items-start',
        )}
      >
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-base font-semibold text-balance text-gray-900">
            {quiz.title}
          </h3>
        </div>

        <div className="mt-4 flex items-center gap-4 sm:gap-4">
          <div className="flex items-center text-xs text-gray-600">
            <CalendarIcon className="mr-1 h-3.5 w-3.5" />
            <span>{updatedAgo}</span>

            <div className="ml-3 flex items-center text-xs text-gray-600">
              <ClipboardCheck className="mr-1 h-3.5 w-3.5" />
              <span className="capitalize">
                {quiz.format === 'mcq' ? 'MCQ' : quiz.format}
              </span>
            </div>
          </div>
        </div>
      </a>

      {showActions && quiz.slug && (
        <div className="absolute top-2 right-2">
          <AIQuizActions quizSlug={quiz.slug} />
        </div>
      )}
    </div>
  );
}
