import { useId, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';

type GuideOptionsProps = {
  depth: string;
  setDepth: (depth: string) => void;
};

export function GuideOptions(props: GuideOptionsProps) {
  const { depth, setDepth } = props;
  const depthSelectId = useId();

  const depthOptions = [
    {
      label: 'Essentials',
      value: 'essentials',
      description: 'Just the code concepts',
    },
    {
      label: 'Detailed',
      value: 'detailed',
      description: 'In-depth explanation',
    },
    {
      label: 'Complete',
      value: 'complete',
      description: 'Cover the topic fully',
    },
  ];

  const selectedDepth = depthOptions.find((option) => option.value === depth);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={depthSelectId} className="inline-block text-gray-500">
        Choose depth of content
      </label>
      <Select value={depth} onValueChange={setDepth}>
        <SelectTrigger
          id={depthSelectId}
          className="h-auto rounded-xl bg-white p-4 text-base"
        >
          {selectedDepth && (
            <div className="flex flex-col gap-1">
              <span>{selectedDepth.label}</span>
            </div>
          )}

          {!selectedDepth && <SelectValue placeholder="Select a depth" />}
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white">
          {depthOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex flex-col gap-1">
                <span>{option.label}</span>
                <span className="text-xs text-gray-500">
                  {option.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
