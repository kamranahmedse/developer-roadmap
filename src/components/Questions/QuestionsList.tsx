import { QuestionsProgress } from './QuestionsProgress';
import { CheckCircle, SkipForward, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import ReactConfetti from 'react-confetti';

export function QuestionsList() {
  const [confettiPos, setConfettiPos] = useState<
    undefined | { x: number; y: number; w: number; h: number }
  >(undefined);

  const alreadyKnowRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="mb-40 gap-3 text-center">
      <QuestionsProgress />

      {confettiPos && (
        <ReactConfetti
          numberOfPieces={20}
          recycle={false}
          onConfettiComplete={() => {
            setConfettiPos(undefined);
          }}
          initialVelocityX={2}
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

      <div className="relative mb-4 h-[400px] w-full overflow-hidden rounded-lg border border-gray-300 bg-white">
        <div className="flex h-full w-full items-center justify-center">
          <p className="animate-pulse text-2xl text-black duration-100">
            Please wait ..
          </p>
        </div>
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
          }}
          className="flex flex-1 items-center rounded-xl border border-gray-300 bg-white py-3 px-4 text-black transition-colors hover:border-black hover:bg-black hover:text-white"
        >
          <CheckCircle className="mr-1 h-4 text-current" />
          Already Know that
        </button>
        <button
          data-next-question="dont-know"
          className="flex flex-1 items-center rounded-xl border border-gray-300 bg-white py-3 px-4 text-black transition-colors hover:border-black hover:bg-black hover:text-white"
        >
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
