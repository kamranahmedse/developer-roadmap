import { BaseDropdown } from './BaseDropdown';
import { BookOpen, FileText } from 'lucide-react';

export const natureTypes = ['course', 'document'] as const;
export type NatureType = (typeof natureTypes)[number];

const natureIcons = {
  course: BookOpen,
  document: FileText,
} as const;

type NatureDropdownProps = {
  value: NatureType;
  onChange: (value: NatureType) => void;
};

export function NatureDropdown(props: NatureDropdownProps) {
  const { value, onChange } = props;

  return (
    <BaseDropdown
      value={value}
      options={natureTypes}
      onChange={onChange}
      icons={natureIcons}
    />
  );
} 