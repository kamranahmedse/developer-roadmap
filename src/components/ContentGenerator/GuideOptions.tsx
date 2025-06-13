import { useId, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';

export function GuideOptions() {
  const [depth, setDepth] = useState<string>('essentials');
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
      <label
        htmlFor={depthSelectId}
        className="inline-block text-sm text-gray-500"
      >
        Choose the guide options
      </label>
      <Select value={depth} onValueChange={setDepth}>
        <SelectTrigger id={depthSelectId}>
          {selectedDepth && (
            <div className="flex flex-col gap-1">
              <span>{selectedDepth.label}</span>
            </div>
          )}

          {!selectedDepth && <SelectValue placeholder="Select a depth" />}
        </SelectTrigger>
        <SelectContent>
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
