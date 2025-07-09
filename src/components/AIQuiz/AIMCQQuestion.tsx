import type { QuizQuestion } from '../../queries/ai-quiz';
import { cn } from '../../lib/classname';
import {
  CheckIcon,
  XIcon,
  InfoIcon,
  AlertTriangleIcon,
  SkipForwardIcon,
} from 'lucide-react';
import { markdownToHtml } from '../../lib/markdown';
import type { QuestionState } from './AIQuizContent';

export const markdownClassName =
  'prose prose-base prose-p:mb-3 prose-p:text-base prose-p:font-normal prose-pre:my-5 prose-p:prose-code:whitespace-nowrap prose-p:prose-code:text-sm prose-p:prose-code:px-2 prose-p:prose-code:py-1 prose-p:prose-code:rounded-md prose-p:prose-code:border prose-p:prose-code:border-gray-300 prose-p:prose-code:bg-gray-50 text-left text-gray-800';

type AIMCQQuestionProps = {
  question: QuizQuestion;
  questionState: QuestionState;

  setSelectedOptions: (options: number[]) => void;
  onSubmit: (status: QuestionState['status']) => void;
  onNext: () => void;
  onSkip: () => void;
  isLastQuestion: boolean;
  onComplete: () => void;
};

export function AIMCQQuestion(props: AIMCQQuestionProps) {
  const {
    question,
    questionState,
    setSelectedOptions,
    onSubmit,
    onSkip,
    onNext,
    isLastQuestion,
    onComplete,
  } = props;
  const { title: questionText, options, answerExplanation } = question;

  const { isSubmitted, selectedOptions = [] } = questionState;

  const canSubmitMultipleAnswers =
    options.filter((option) => option.isCorrect).length > 1;

  const handleSelectOption = (index: number) => {
    if (isSubmitted) {
      return;
    }

    if (!canSubmitMultipleAnswers) {
      const newSelectedOptions = [index];
      setSelectedOptions(newSelectedOptions);
      return;
    }

    const newSelectedOptions = selectedOptions.includes(index)
      ? selectedOptions.filter((id) => id !== index)
      : [...selectedOptions, index];
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      if (isLastQuestion) {
        onComplete();
      } else {
        onNext();
      }
      return;
    }

    const isCorrect =
      selectedOptions.every((index) => options[index].isCorrect) &&
      selectedOptions.length ===
        options.filter((option) => option.isCorrect).length;

    onSubmit(isCorrect ? 'correct' : 'incorrect');
  };

  const hasAnySelected = selectedOptions.length > 0;
  const canSubmit = hasAnySelected || questionState.status === 'skipped';

  return (
    <div className="mx-auto max-w-4xl">
      <QuestionTitle title={questionText} />

      <div className="mt-8">
        {options.map((option, index) => {
          const isSelected = selectedOptions.includes(index);
          const isCorrectOption = option.isCorrect;

          const isSelectedAndCorrect =
            isSubmitted && isSelected && isCorrectOption;
          const isSelectedAndIncorrect =
            isSubmitted && isSelected && !isCorrectOption;
          const isNotSelectedAndCorrect =
            isSubmitted && !isSelected && isCorrectOption;

          const html = markdownToHtml(option.title, false);

          const isOptionDisabled =
            isSubmitted && !isSelected && !isCorrectOption;

          return (
            <button
              key={option.id}
              className={cn(
                'group flex w-full items-start gap-4 rounded-lg py-2 text-left',
                isSelected && !isSubmitted && '',
                isSubmitted &&
                  isSelectedAndCorrect &&
                  'border-green-500 text-green-700',
                isSubmitted &&
                  isSelectedAndIncorrect &&
                  'border-red-500 text-red-700',
                isSubmitted &&
                  isNotSelectedAndCorrect &&
                  'border-green-500 text-green-700',
                isOptionDisabled && 'cursor-not-allowed opacity-50',
              )}
              onClick={() => handleSelectOption(index)}
              disabled={isOptionDisabled}
            >
              <div
                className={cn(
                  'flex size-6.5 shrink-0 items-center justify-center rounded-lg border-2 border-gray-300',
                  isSelected &&
                    !isSubmitted &&
                    'border-black bg-black text-white',
                  isSelectedAndCorrect &&
                    'border-green-500 bg-green-500 text-white',
                  isSelectedAndIncorrect &&
                    'border-red-500 bg-red-500 text-white',
                  isNotSelectedAndCorrect &&
                    'border-green-500 bg-green-500 text-white',
                  !isSelected &&
                    !isSubmitted &&
                    'group-hover:border-gray-300 group-hover:bg-gray-200',
                )}
              >
                {isSelected && !isSubmitted && (
                  <div className="size-5 bg-black" />
                )}
                {isSelectedAndCorrect && <CheckIcon className="size-5" />}

                {isSelectedAndIncorrect && <XIcon className="size-5" />}

                {isNotSelectedAndCorrect && <CheckIcon className="size-5" />}
              </div>
              <div
                className={cn(markdownClassName, 'flex-1')}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </button>
          );
        })}
      </div>

      {isSubmitted && answerExplanation && (
        <QuestionExplanation
          explanation={answerExplanation}
          status={questionState.status}
        />
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={onSkip}
          disabled={isSubmitted}
          className="rounded-xl bg-gray-100 px-8 py-3 text-base font-medium text-gray-800 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Skip Question
        </button>
        <button
          className={cn(
            'rounded-xl bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50',
          )}
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {isSubmitted
            ? isLastQuestion
              ? 'Finish Quiz'
              : 'Next Question'
            : 'Check Answer'}
        </button>
      </div>
    </div>
  );
}

type QuestionTitleProps = {
  title: string;
};

export function QuestionTitle(props: QuestionTitleProps) {
  const { title } = props;

  const titleHtml = markdownToHtml(title, false);

  return (
    <div
      className="prose prose-xl prose-headings:text-3xl prose-headings:font-bold prose-headings:text-black prose-headings:mb-6 prose-p:text-3xl prose-p:font-semibold prose-p:leading-normal prose-p:text-black prose-p:mb-0 prose-pre:my-5 prose-p:prose-code:whitespace-nowrap prose-p:prose-code:relative prose-p:prose-code:top-[-5px] prose-p:prose-code:text-xl prose-p:prose-code:px-3 prose-p:prose-code:py-1 prose-p:prose-code:rounded-md prose-p:prose-code:border prose-p:prose-code:border-gray-300 prose-p:prose-code:bg-gray-100 prose-p:prose-code:font-medium mb-2 text-left"
      dangerouslySetInnerHTML={{ __html: titleHtml }}
    />
  );
}

type QuestionExplanationProps = {
  explanation: string;
  title?: string;
  status?: 'correct' | 'incorrect' | 'can_be_improved' | 'skipped' | 'pending';
};

export function QuestionExplanation(props: QuestionExplanationProps) {
  const { explanation, title, status } = props;

  const explanationHtml = markdownToHtml(explanation, false);

  const getStatusConfig = () => {
    switch (status) {
      case 'correct':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconBgColor: 'bg-green-500',
          textColor: 'text-green-800',
          icon: CheckIcon,
          defaultTitle: 'Correct Answer',
        };
      case 'incorrect':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconBgColor: 'bg-red-500',
          textColor: 'text-red-800',
          icon: XIcon,
          defaultTitle: 'Incorrect Answer',
        };
      case 'can_be_improved':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconBgColor: 'bg-yellow-500',
          textColor: 'text-yellow-800',
          icon: AlertTriangleIcon,
          defaultTitle: 'Can Be Improved',
        };
      case 'skipped':
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconBgColor: 'bg-gray-500',
          textColor: 'text-gray-800',
          icon: SkipForwardIcon,
          defaultTitle: 'Question Skipped',
        };
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconBgColor: 'bg-blue-500',
          textColor: 'text-blue-800',
          icon: InfoIcon,
          defaultTitle: 'Explanation',
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;
  const displayTitle = title || config.defaultTitle;

  return (
    <div
      className={cn(
        'mt-6 rounded-xl border-2 p-6 transition-all duration-200',
        config.bgColor,
        config.borderColor,
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className={cn(
            'flex size-8 items-center justify-center rounded-full text-white',
            config.iconBgColor,
          )}
        >
          <IconComponent className="size-4" strokeWidth={2.5} />
        </div>
        <h3 className={cn('text-lg font-semibold', config.textColor)}>
          {displayTitle}
        </h3>
      </div>
      <div
        className={cn(markdownClassName, 'leading-relaxed text-gray-700')}
        dangerouslySetInnerHTML={{ __html: explanationHtml }}
      />
    </div>
  );
}
