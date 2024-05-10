import { useState } from 'react';

type TipItemProps = {
  title: string;
  description: string;
};
export function TipItem(props: TipItemProps) {
  const { title, description } = props;

  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="flex flex-col">
      {!isToggled && (
        <div
          onClick={() => setIsToggled(true)}
          className="cursor-pointer rounded-lg sm:rounded-xl bg-black px-3 py-2 text-sm sm:text-base text-white"
        >
          {title}
        </div>
      )}
      {isToggled && (
        <p
          className="rounded-lg sm:rounded-xl bg-gray-200 px-3 py-2 text-black text-sm sm:text-base"
        >
          {description}
        </p>
      )}
    </div>
  );
}
