import type { QuizQuestion } from '../../queries/ai-quiz';
import { useState } from 'react';
import { cn } from '../../lib/classname';
import { CheckIcon, XIcon, InfoIcon } from 'lucide-react';

type AIMCQQuestionProps = {
  question: QuizQuestion;
};

export function AIMCQQuestion(props: AIMCQQuestionProps) {
  const { question } = props;
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
    setIsSubmitted(true);
  };

  const canSubmit = selectedOptions.length > 0;

  return (
    <div>
      <h3 className="text-4xl font-medium">{questionText}</h3>
      <div className="mt-6 space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedOptions.includes(index);
          const showCorrectness = isSubmitted && isSelected;
          const isCorrectOption = option.isCorrect;

          const isSelectedAndCorrect =
            isSubmitted && isSelected && isCorrectOption;
          const isSelectedAndIncorrect =
            isSubmitted && isSelected && !isCorrectOption;
          const isNotSelectedAndCorrect =
            isSubmitted && !isSelected && isCorrectOption;

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
              <p className="text-left">{option.title}</p>
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
        Submit Answer
      </button>
    </div>
  );
}
