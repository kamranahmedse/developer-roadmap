import type { QuizQuestion } from '../../queries/ai-quiz';

type AIMCQQuestionProps = {
  question: QuizQuestion;
};

export function AIMCQQuestion(props: AIMCQQuestionProps) {
  const { question } = props;
  const { title: questionText, options } = question;

  return (
    <div>
      <h3 className="text-3xl font-medium">{questionText}</h3>
      <div className="mt-4">
        {options.map((option) => (
          <div key={option.id}>{option.title}</div>
        ))}
      </div>
    </div>
  );
}
