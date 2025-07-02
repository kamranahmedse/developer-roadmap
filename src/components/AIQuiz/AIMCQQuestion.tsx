import type { QuizQuestion } from '../../queries/ai-quiz';
import { cn } from '../../lib/classname';
import { CheckIcon, XIcon, InfoIcon } from 'lucide-react';
import { markdownToHtml } from '../../lib/markdown';
import type { QuestionState } from './AIQuizContent';

export const markdownClassName =
  'prose prose-lg prose-p:text-lg prose-p:font-normal prose-p:my-0 prose-pre:my-0 prose-p:prose-code:text-base! prose-p:prose-code:px-2 prose-p:prose-code:py-0.5 prose-p:prose-code:rounded-lg prose-p:prose-code:border prose-p:prose-code:border-black text-left text-black';

type AIMCQQuestionProps = {
  question: QuizQuestion;
  questionState: QuestionState;

  setSelectedOptions: (options: number[]) => void;
  onSubmit: (status: QuestionState['status']) => void;
  onNext: () => void;
};

export function AIMCQQuestion(props: AIMCQQuestionProps) {
  const { question, questionState, setSelectedOptions, onSubmit, onNext } =
    props;
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
      onNext?.();
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
    <div>
      <QuestionTitle title={questionText} />

      <div className="mt-6 space-y-3">
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
                'text-l flex w-full items-start gap-2 rounded-xl border border-gray-200 p-2',
                isSelected && !isSubmitted && 'border-gray-400 bg-gray-50',
                isSubmitted &&
                  isSelectedAndCorrect &&
                  'border-green-500 bg-green-50',
                isSubmitted &&
                  isSelectedAndIncorrect &&
                  'border-red-500 bg-red-50',
                isSubmitted &&
                  isNotSelectedAndCorrect &&
                  'border-green-500 bg-green-50',
                !isSelected && !isCorrectOption
                  ? 'hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                  : '',
              )}
              onClick={() => handleSelectOption(index)}
              disabled={isOptionDisabled}
            >
              <div
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-lg border border-gray-200',
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
                {isSelected && !isSubmitted && <CheckIcon className="size-4" />}
                {isSelectedAndCorrect && <CheckIcon className="size-4" />}

                {isSelectedAndIncorrect && <XIcon className="size-4" />}

                {isNotSelectedAndCorrect && <CheckIcon className="size-4" />}
              </div>
              <div
                className={cn(markdownClassName, 'mt-0.5')}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </button>
          );
        })}
      </div>

      {isSubmitted && answerExplanation && (
        <QuestionExplanation explanation={answerExplanation} />
      )}

      <button
        className={cn(
          'mt-4 rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-900 disabled:opacity-70',
        )}
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        {isSubmitted ? 'Next Question' : 'Submit Answer'}
      </button>
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
      className="prose prose-lg prose-p:text-4xl prose-p:font-medium prose-p:my-4 prose-pre:my-0 prose-p:prose-code:text-3xl! prose-p:prose-code:px-3 prose-p:prose-code:rounded-lg prose-p:prose-code:border prose-p:prose-code:border-black text-black"
      dangerouslySetInnerHTML={{ __html: titleHtml }}
    />
  );
}

type QuestionExplanationProps = {
  explanation: string;
};

export function QuestionExplanation(props: QuestionExplanationProps) {
  const { explanation } = props;

  const explanationHtml = markdownToHtml(explanation, false);

  return (
    <div className="mt-4 rounded-xl bg-gray-100 p-4">
      <p className="flex items-center gap-2 text-lg text-gray-600">
        <InfoIcon className="size-4" />
        Explanation
      </p>
      <div
        className={cn(markdownClassName, 'mt-0.5')}
        dangerouslySetInnerHTML={{ __html: explanationHtml }}
      />
    </div>
  );
}
