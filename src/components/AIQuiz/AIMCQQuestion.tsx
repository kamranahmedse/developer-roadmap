import type { QuizQuestion } from '../../queries/ai-quiz';
import { useState } from 'react';
import { cn } from '../../lib/classname';
import { CheckIcon, XIcon, InfoIcon } from 'lucide-react';
import { markdownToHtml } from '../../lib/markdown';

type AIMCQQuestionProps = {
  question: QuizQuestion;
  onNextQuestion?: () => void;
};

export function AIMCQQuestion(props: AIMCQQuestionProps) {
  const { question, onNextQuestion } = props;
  const { title: questionText, options, answerExplanation } = question;

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canSubmitMultipleAnswers =
    options.filter((option) => option.isCorrect).length > 1;

  const handleSelectOption = (index: number) => {
    if (!canSubmitMultipleAnswers) {
      setSelectedOptions((prev) => (prev.includes(index) ? [] : [index]));
      return;
    }

    setSelectedOptions((prev) => {
      if (prev.includes(index)) {
        return prev.filter((id) => id !== index);
      }
      return [...prev, index];
    });
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      onNextQuestion?.();
      setSelectedOptions([]);
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
  };

  const canSubmit = selectedOptions.length > 0;
  const titleHtml = markdownToHtml(questionText, false);

  return (
    <div>
      <div
        className="prose prose-lg prose-p:text-4xl prose-p:font-medium prose-p:my-4 prose-pre:my-0 prose-p:prose-code:text-4xl! prose-p:prose-code:px-3 prose-p:prose-code:rounded-lg prose-p:prose-code:border prose-p:prose-code:border-black text-black"
        dangerouslySetInnerHTML={{ __html: titleHtml }}
      />

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

          return (
            <button
              key={option.id}
              className={cn(
                'flex w-full items-start gap-2 rounded-xl border border-gray-200 p-2 text-lg hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50',
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
              )}
              onClick={() => handleSelectOption(index)}
              disabled={isSubmitted && !isSelected && !isCorrectOption}
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
                className="prose prose-lg prose-p:text-lg prose-p:font-normal prose-p:my-0 prose-pre:my-0 prose-p:prose-code:text-lg! prose-p:prose-code:px-2 prose-p:prose-code:py-0.5 prose-p:prose-code:rounded-lg prose-p:prose-code:border prose-p:prose-code:border-black mt-0.5 text-left text-black"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </button>
          );
        })}
      </div>

      {isSubmitted && (
        <div className="mt-4 rounded-xl bg-gray-100 p-4">
          <p className="flex items-center gap-2 text-lg text-gray-600">
            <InfoIcon className="size-4" />
            Explanation
          </p>
          <p className="mt-1">{answerExplanation}</p>
        </div>
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
