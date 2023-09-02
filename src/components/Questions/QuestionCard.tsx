import { useEffect, useRef, useState } from 'react';

export function QuestionCard() {
  const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // set the height of the question width to the height of the answer
    // width if the answer is visible and the question height is less than
    // the answer height
    if (isAnswerVisible) {
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
    const questionTop = questionRef.current?.getBoundingClientRect().top || 0;
    if (questionTop < 0) {
      window.scrollTo({
        top: window.scrollY + questionTop - 100,
      });
    }
  }, [isAnswerVisible]);

  return (
    <>
      <div
        ref={questionRef}
        className={`flex flex-grow flex-col items-center justify-center py-8`}
      >
        <div className="text-gray-400">
          <span>Frontend</span>
          <span className="mx-3">&middot;</span>
          <span className="capitalize">Easy Question</span>
        </div>

        <div className="mx-auto flex max-w-[550px] flex-1 items-center justify-center py-8">
          <p className="text-3xl leading-normal text-black">
            What do you think is the output of the following code?
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
        <div className="mx-auto flex max-w-[600px] flex-grow items-center py-0 px-5 text-2xl leading-normal">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quod, quas, quia, voluptates voluptate quibusdam
            voluptatibus quos quae quidem. Quisqu<br />
            <br />
            Quisquam voluptatum, quod, quas, quia, voluptates voluptate
            quibusdam voluptatibus quos quae quidem. Quisquam voluptatum, quod,
            quas, quia, voluptates voluptate quibusdam voluptatibus quos quae
            quidem. Quisquam voluptatum, quod, quas, quia, voluptates voluptate
            quibusdam voluptatibus quos quae quidem.
            <br />
            <br />
            Quisquam voluptatum, quod, quas, quia, voluptates voluptate
            quibusdam voluptatibus quos quae quidem. Quisquam voluptatum, quod,
            quas, quia, voluptates voluptate quibusdam voluptatibus quos quae
            quidem. Quisquam voluptatum, quod, quas, quia, voluptates voluptate
            quibusdam voluptatibus quos quae quidem.
          </p>
        </div>
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
