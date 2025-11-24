import type { SelectRoadmapModalProps } from './SelectRoadmapModal';

type SelectRoadmapModalItemProps = {
  title: string;
  isSelected: boolean;
  onClick: () => void;
};

export function SelectRoadmapModalItem(props: SelectRoadmapModalItemProps) {
  const { isSelected, onClick, title } = props;
  return (
    <button
      className={`group flex min-h-[35px] items-stretch overflow-hidden rounded-md text-sm ${
        !isSelected
          ? 'border border-gray-300 hover:bg-gray-100'
          : 'bg-black text-white transition-colors hover:bg-gray-700'
      }`}
      onClick={onClick}
    >
      <span className="flex items-center px-3">{title}</span>
      {isSelected && (
        <span className="flex items-center bg-gray-700 px-3 text-xs text-white transition-colors">
          &times;
        </span>
      )}

      {!isSelected && (
        <span className="flex items-center bg-gray-100 px-2.5 text-xs text-gray-500">
          +
        </span>
      )}
    </button>
  );
}
