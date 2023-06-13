import Select, { ActionMeta, OnChangeValue } from 'react-select';

export type RoadmapOptionProps = {
  value: string;
  label: string;
};

export interface RoadmapSelectProps {
  options: RoadmapOptionProps[];
  selectedRoadmaps: RoadmapOptionProps[];
  setSelectedRoadmap: (roadmap: RoadmapOptionProps[]) => void;
}

const controlStyles = {
  base: 'border rounded-lg bg-white hover:cursor-pointer',
  focus: 'border-primary-600 ring-1 ring-primary-500',
  nonFocus: 'border-gray-300 hover:border-gray-400',
};
const placeholderStyles = 'text-gray-500 pl-1 py-0.5';
const selectInputStyles = 'pl-1 py-0.5';
const valueContainerStyles = 'p-1 gap-1';
const singleValueStyles = 'text-sm ml-1';
const multiValueStyles =
  'bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5';
const multiValueLabelStyles = 'leading-none py-1 text-sm';
const multiValueRemoveStyles =
  'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md p-0.5';
const indicatorsContainerStyles = 'py-0 px-1 gap-1';
const clearIndicatorStyles =
  'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800';
const indicatorSeparatorStyles = 'bg-gray-300';
const dropdownIndicatorStyles =
  'p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black';
const menuStyles =
  'p-1 mt-2 border border-gray-200 bg-white rounded-lg shadow-lg';
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm';
const optionStyles = {
  base: 'hover:cursor-pointer px-3 text-sm py-2 rounded',
  focus: 'bg-gray-100 active:bg-gray-200',
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
};
const noOptionsMessageStyles =
  'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm';

export function RoadmapSelect({
  options,
  selectedRoadmaps,
  setSelectedRoadmap,
}: RoadmapSelectProps) {
  const onChange = (
    newValue: OnChangeValue<RoadmapOptionProps, true>,
    actionMeta: ActionMeta<RoadmapOptionProps>
  ) => {
    if (actionMeta.action === 'clear') {
      setSelectedRoadmap([]);
      return;
    }
    // Only allow selecting up to 4 roadmaps.
    if (newValue.length > 4) {
      return;
    }
    setSelectedRoadmap(Array.isArray(newValue) ? newValue : [newValue]);
  };

  return (
    <div>
      {/* @ts-ignore */}
      <Select
        isMulti
        options={options}
        onChange={onChange}
        value={selectedRoadmaps}
        unstyled
        styles={{
          input: (base) => ({
            ...base,
            'input:focus': {
              boxShadow: 'none',
            },
          }),
          // On mobile, the label will truncate automatically, so we want to
          // override that behaviour.
          multiValueLabel: (base) => ({
            ...base,
            // whiteSpace: 'normal',
            // overflow: 'visible',
          }),
          control: (base) => ({
            ...base,
            transition: 'none',
          }),
        }}
        classNames={{
          control: ({ isFocused }) =>
            `${isFocused ? controlStyles.focus : controlStyles.nonFocus} ${
              controlStyles.base
            }`,
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            `${isFocused && optionStyles.focus} ${
              isSelected && optionStyles.selected
            } ${optionStyles.base}`,
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
      />

      <div className="mt-1 text-sm text-gray-500">Select up to 4 roadmaps</div>
    </div>
  );
}
