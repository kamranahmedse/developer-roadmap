import { useEffect, useRef, useState } from 'react';
import type { QuestionType } from '../../lib/question-group';
import { markdownToHtml } from '../../lib/markdown';
import Prism from 'prismjs';
import './PrismAtom.css';

type QuestionCardProps = {
  question: QuestionType;
};

export function QuestionCard(props: QuestionCardProps) {
  const { question } = props;

  const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // set the height of the question width to the height of the answer
    // width if the answer is visible and the question height is less than
    // the answer height
    if (isAnswerVisible) {
      Prism.highlightAll();

      const answerHeight = answerRef.current?.clientHeight || 0;
      const questionHeight = questionRef.current?.clientHeight || 0;

      if (answerHeight > questionHeight) {
        questionRef.current!.style.height = `${answerHeight}px`;
      }
    } else {
      questionRef.current!.style.height = `auto`;
    }

    // if the user has scrolled down and the top of the answer is not
    // visible, scroll to the top of the answer
    const questionTop =
      (questionRef.current?.getBoundingClientRect().top || 0) - 147;
    if (questionTop < 0) {
      window.scrollTo({
        top: window.scrollY + questionTop - 10,
      });
    }
  }, [isAnswerVisible]);

  useEffect(() => {
    setIsAnswerVisible(false);
  }, [question]);

  return (
    <>
      <div
        ref={questionRef}
        className={`flex flex-grow flex-col items-center justify-center py-8`}
      >
        <div className="text-gray-400">
          {question.topics?.map((topic, counter) => {
            const totalTopics = question.topics?.length || 0;

            return (
              <>
                <span className="capitalize">{topic}</span>
                {counter !== totalTopics - 1 && (
                  <span className="mx-2">&middot;</span>
                )}
              </>
            );
          })}
        </div>

        <div className="mx-auto flex max-w-[550px] flex-1 items-center justify-center py-8">
          <p className="text-3xl font-semibold leading-normal text-black">
            {question.question}
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              setIsAnswerVisible(true);
            }}
            className="cursor-pointer text-gray-500 underline underline-offset-4 transition-colors hover:text-black"
          >
            Click to Reveal the Answer
          </button>
        </div>
      </div>

      <div
        ref={answerRef}
        className={`absolute left-0 right-0 flex flex-col items-center justify-center rounded-[7px] bg-neutral-100 py-8 text-xl leading-normal text-black transition-all duration-300 ${
          isAnswerVisible ? 'top-0 min-h-[398px]' : 'top-full'
        }`}
      >
        {!question.isLongAnswer && (
          <div
            className={`mx-auto flex max-w-[600px] flex-grow flex-col items-center justify-center py-0 px-5 text-center text-xl leading-normal`}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(question.answer, false),
            }}
          />
        )}

        {question.isLongAnswer && (
          <div
            className={`qa-answer prose prose-sm prose-quoteless mx-auto flex w-full max-w-[600px] flex-grow flex-col items-start justify-center py-0 px-5 text-left text-lg prose-h1:mb-2.5 prose-h1:mt-7 prose-h2:mb-3 prose-h2:mt-0 prose-h3:mb-[5px] prose-h3:mt-[10px] prose-p:mb-4 prose-p:mt-0 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-pre:w-full prose-pre:!mb-6 prose-li:m-0 prose-li:mb-0.5`}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(question.answer, false),
            }}
          />
        )}
        <div className="mt-7 text-center">
          <button
            onClick={() => {
              setIsAnswerVisible(false);
            }}
            className="cursor-pointer text-base text-gray-500 underline underline-offset-4 transition-colors hover:text-black"
          >
            Hide the Answer
          </button>
        </div>
      </div>
    </>
  );
}
