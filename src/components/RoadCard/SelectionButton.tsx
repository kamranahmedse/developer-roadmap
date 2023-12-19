type SelectionButtonProps = {
  text: string;
  isDisabled: boolean;
  isSelected: boolean;
  onClick: () => void;
};

export function SelectionButton(props: SelectionButtonProps) {
  const { text, isDisabled, isSelected, onClick } = props;

  return (
    <button
      className={`rounded-md border p-1 px-2 text-sm ${
        isSelected ? ' border-gray-500 bg-gray-300 ' : ''
      } ${
        !isDisabled ? ' cursor-pointer ' : ' cursor-not-allowed opacity-40 '
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
