import ChevronDownIcon from '../../icons/chevron-down.svg';

type NotDropdownProps = {
  onClick: () => void;
  selectedCount: number;
  singularName: string;
  pluralName: string;
};

export function NotDropdown(props: NotDropdownProps) {
  const { onClick, selectedCount, singularName, pluralName } = props;

  const singularOrPlural = selectedCount === 1 ? singularName : pluralName;

  return (
    <div
      className="flex cursor-text items-center justify-between rounded-md border border-gray-300 px-3 py-2.5 hover:border-gray-400/50 hover:bg-gray-50"
      role="button"
      onClick={onClick}
    >
      {selectedCount > 0 && (
        <div className="flex flex-col">
          <p className="mb-1.5 text-base font-medium text-gray-800">
            {selectedCount} {singularOrPlural} selected
          </p>
          <p className="text-sm text-gray-400">
            Click to add or change selection
          </p>
        </div>
      )}

      {selectedCount === 0 && (
        <div className="flex flex-col">
          <p className="text-base text-gray-400">
            Click to select {pluralName}
          </p>
        </div>
      )}

      <img
        alt={singularName}
        src={ChevronDownIcon}
        className={'relative top-[1px] h-[17px] w-[17px] opacity-40'}
      />
    </div>
  );
}
