import type { QuizQuestion } from '../../queries/ai-quiz';
import { cn } from '../../lib/classname';
import { CheckIcon, XIcon, InfoIcon } from 'lucide-react';
import { markdownToHtml } from '../../lib/markdown';
import type { QuestionState } from './AIQuizContent';

export const markdownClassName =
  'prose prose-base prose-p:text-base prose-p:font-normal prose-p:my-0 prose-pre:my-0 prose-p:prose-code:text-sm prose-p:prose-code:px-2 prose-p:prose-code:py-1 prose-p:prose-code:rounded-md prose-p:prose-code:border prose-p:prose-code:border-gray-300 prose-p:prose-code:bg-gray-50 text-left text-gray-800';

type AIMCQQuestionProps = {
  question: QuizQuestion;
  questionState: QuestionState;

  setSelectedOptions: (options: number[]) => void;
  onSubmit: (status: QuestionState['status']) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  onComplete: () => void;
};

export function AIMCQQuestion(props: AIMCQQuestionProps) {
  const {
    question,
    questionState,
    setSelectedOptions,
    onSubmit,
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

  const canSubmit = selectedOptions.length > 0;

  return (
    <div className="mx-auto max-w-4xl">
      <QuestionTitle title={questionText} />

      <div className="mt-8 space-y-4">
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
                'flex w-full items-start gap-4 rounded-xl border-2 border-gray-200 px-4 py-3.5 text-left',
                isSelected && !isSubmitted && 'border-black bg-gray-50',
                isSubmitted &&
                  isSelectedAndCorrect &&
                  'border-green-500 bg-green-50',
                isSubmitted &&
                  isSelectedAndIncorrect &&
                  'border-red-500 bg-red-50',
                isSubmitted &&
                  isNotSelectedAndCorrect &&
                  'border-green-500 bg-green-50',
                !isSelected && !isCorrectOption && !isSubmitted
                  ? 'hover:border-gray-300 hover:bg-gray-50'
                  : '',
                isOptionDisabled && 'cursor-not-allowed opacity-60',
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
                )}
              >
                {isSelected && !isSubmitted && <CheckIcon className="size-5" />}
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
        <QuestionExplanation explanation={answerExplanation} />
      )}

      <div className="mt-8 flex justify-center">
        <button
          className={cn(
            'rounded-lg bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50',
          )}
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {isSubmitted
            ? isLastQuestion
              ? 'Finish Quiz'
              : 'Next Question'
            : 'Submit Answer'}
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
      className="prose prose-xl prose-headings:text-3xl prose-headings:font-bold prose-headings:text-black prose-headings:mb-6 prose-p:text-3xl prose-p:font-semibold prose-p:leading-relaxed prose-p:text-black prose-p:mb-0 prose-pre:my-0 prose-p:prose-code:text-xl prose-p:prose-code:px-3 prose-p:prose-code:py-1 prose-p:prose-code:rounded-md prose-p:prose-code:border prose-p:prose-code:border-gray-300 prose-p:prose-code:bg-gray-100 prose-p:prose-code:font-medium mb-2 text-left"
      dangerouslySetInnerHTML={{ __html: titleHtml }}
    />
  );
}

type QuestionExplanationProps = {
  explanation: string;
  title?: string;
};

export function QuestionExplanation(props: QuestionExplanationProps) {
  const { explanation, title } = props;

  const explanationHtml = markdownToHtml(explanation, false);

  return (
    <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-5">
      <p className="mb-3 flex items-center gap-2 text-base font-medium text-blue-800">
        <InfoIcon className="size-5" />
        {title || 'Explanation'}
      </p>
      <div
        className={cn(markdownClassName, 'text-blue-900')}
        dangerouslySetInnerHTML={{ __html: explanationHtml }}
      />
    </div>
  );
}
