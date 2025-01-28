import { Fragment, useEffect, useRef, useState } from 'react';
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
        className={`flex grow flex-col items-center justify-center py-5 sm:py-8`}
      >
        <div className="hidden text-gray-400 sm:block">
          {question.topics?.map((topic, counter) => {
            const totalTopics = question.topics?.length || 0;

            return (
              <Fragment key={topic}>
                <span className="capitalize">{topic}</span>
                {counter !== totalTopics - 1 && (
                  <span className="mx-2">&middot;</span>
                )}
              </Fragment>
            );
          })}
        </div>

        <div className="mx-auto flex max-w-[550px] flex-1 items-center justify-center py-3 sm:py-8">
          <p className="px-4 text-xl font-semibold leading-snug! text-black sm:text-3xl">
            {question.question}
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              setIsAnswerVisible(true);
            }}
            className="cursor-pointer text-sm text-gray-500 underline underline-offset-4 transition-colors hover:text-black sm:text-base"
          >
            Click to Reveal the Answer
          </button>
        </div>
      </div>

      <div
        ref={answerRef}
        className={`absolute left-0 right-0 flex flex-col items-center justify-center rounded-[7px] bg-neutral-100 py-4 text-sm leading-normal text-black transition-all duration-300 sm:py-8 sm:text-xl ${
          isAnswerVisible ? 'top-0 min-h-[248px] sm:min-h-[398px]' : 'top-full'
        }`}
      >
        {!question.isLongAnswer && (
          <div
            className={`mx-auto flex max-w-[600px] grow flex-col items-center justify-center py-0 px-5 text-center text-base [&>p]:leading-relaxed sm:text-xl`}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(question.answer, false),
            }}
          />
        )}

        {question.isLongAnswer && (
          <div
            className={`qa-answer prose prose-sm prose-quoteless mx-auto flex w-full max-w-[600px] grow flex-col items-start justify-center py-0 px-4 text-left text-sm prose-h1:mb-2.5 prose-h1:mt-7 prose-h2:mb-3 prose-h2:mt-0 prose-h3:mb-[5px] prose-h3:mt-[10px] prose-p:mb-2 prose-p:mt-0 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-pre:mb-6! prose-pre:w-full prose-ul:my-2 prose-li:m-0 prose-li:mb-0.5 sm:px-5 sm:text-lg sm:prose-p:mb-4`}
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
            className="cursor-pointer text-sm text-gray-500 underline underline-offset-4 transition-colors hover:text-black sm:text-base"
          >
            Hide the Answer
          </button>
        </div>
      </div>
    </>
  );
}
