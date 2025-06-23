import { BaseDropdown } from './BaseDropdown';
import {
    difficultyLevels,
    type DifficultyLevel,
} from '../GenerateCourse/AICourse';

type DifficultyDropdownProps = {
  value: DifficultyLevel;
  onChange: (value: DifficultyLevel) => void;
};

export function DifficultyDropdown(props: DifficultyDropdownProps) {
  const { value, onChange } = props;

  return (
    <BaseDropdown
      value={value}
      options={difficultyLevels}
      onChange={onChange}
    />
  );
}
