import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

type ConfettiPosition = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type ConfettiProps = {
  element: HTMLElement | null;
  onDone: () => void;
};

export function Confetti(props: ConfettiProps) {
  const { element, onDone } = props;

  const [confettiPos, setConfettiPos] = useState<
    undefined | ConfettiPosition
  >();

  useEffect(() => {
    if (!element) {
      setConfettiPos(undefined);
      return;
    }

    const elRect = element.getBoundingClientRect();

    // set confetti position, keeping in mind the scroll values
    setConfettiPos({
      x: elRect?.x || 0,
      y: (elRect?.y || 0) + window.scrollY,
      w: elRect?.width || 0,
      h: elRect?.height || 0,
    });
  }, [element]);

  if (!confettiPos) {
    return null;
  }

  return (
    <ReactConfetti
      height={document.body.scrollHeight}
      numberOfPieces={40}
      recycle={false}
      onConfettiComplete={(confettiInstance) => {
        confettiInstance?.reset();
        setConfettiPos(undefined);
        onDone();
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
  );
}
