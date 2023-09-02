import { useRef, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { QuestionsProgress } from './QuestionsProgress';
import { CheckCircle, SkipForward, Sparkles } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { QuestionLoader } from './QuestionLoader';
import { isLoggedIn } from '../../lib/jwt';

type ConfettiPosition = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export function QuestionsList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [givenAnswers, setGivenAnswers] = useState<string[]>([]);
  const [confettiPos, setConfettiPos] = useState<undefined | ConfettiPosition>(
    undefined
  );

  const alreadyKnowRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="mb-40 gap-3 text-center">
      <QuestionsProgress
        showLoginAlert={!isLoggedIn() && givenAnswers.length !== 0}
      />

      {confettiPos && (
        <ReactConfetti
          height={document.body.scrollHeight}
          numberOfPieces={40}
          recycle={false}
          onConfettiComplete={(confettiInstance) => {
            confettiInstance?.reset();
            setConfettiPos(undefined);
          }}
          initialVelocityX={4}
          initialVelocityY={8}
          tweenDuration={25}
          confettiSource={{
            x: confettiPos.x,
            y: confettiPos.y,
            w: confettiPos.w,
            h: confettiPos.h,
          }}
        />
      )}

      <div className="relative mb-4 flex min-h-[400px] w-full overflow-hidden rounded-lg border border-gray-300 bg-white">
        <QuestionCard />
        {isLoading && <QuestionLoader />}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          ref={alreadyKnowRef}
          onClick={(e) => {
            const alreadyKnowRect =
              alreadyKnowRef.current?.getBoundingClientRect();
            const buttonX = alreadyKnowRect?.x || 0;
            const buttonY = alreadyKnowRect?.y || 0;

            // set confetti position, keeping in mind the scroll values
            setConfettiPos({
              x: buttonX,
              y: buttonY + window.scrollY,
              w: alreadyKnowRect?.width || 0,
              h: alreadyKnowRect?.height || 0,
            });

            setGivenAnswers((prev) => [...prev, 'alreadyKnow']);
          }}
          className="flex flex-1 items-center rounded-xl border border-gray-300 bg-white py-3 px-4 text-black transition-colors hover:border-black hover:bg-black hover:text-white"
        >
          <CheckCircle className="mr-1 h-4 text-current" />
          Already Know that
        </button>
        <button className="flex flex-1 items-center rounded-xl border border-gray-300 bg-white py-3 px-4 text-black transition-colors hover:border-black hover:bg-black hover:text-white">
          <Sparkles className="mr-1 h-4 text-current" />
          Didn't Know that
        </button>
        <button
          data-next-question="skip"
          className="flex flex-1 items-center rounded-xl border border-red-600 p-3 text-red-600 hover:bg-red-600 hover:text-white"
        >
          <SkipForward className="mr-1 h-4" />
          Skip Question
        </button>
      </div>
    </div>
  );
}
