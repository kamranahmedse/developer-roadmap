import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/classname';

type SelectionButtonProps = {
  text: string;
  isDisabled: boolean;
  isSelected: boolean;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function SelectionButton(props: SelectionButtonProps) {
  const { text, isDisabled, isSelected, onClick, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={cn(
        'rounded-md border p-1 px-2 text-sm',
        isSelected ? 'border-gray-500 bg-gray-300' : '',
        !isDisabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-40',
        className,
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
