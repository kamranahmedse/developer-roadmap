import { useId, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';

type CourseOptionsProps = {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
};

export function CourseOptions(props: CourseOptionsProps) {
  const { difficulty, setDifficulty } = props;
  const difficultySelectId = useId();

  const difficultyOptions = [
    {
      label: 'Beginner',
      value: 'beginner',
      description: 'Covers fundamental concepts',
    },
    {
      label: 'Intermediate',
      value: 'intermediate',
      description: 'Explore advanced topics',
    },
    {
      label: 'Advanced',
      value: 'advanced',
      description: 'Deep dives into complex concepts',
    },
  ];

  const selectedDifficulty = difficultyOptions.find(
    (option) => option.value === difficulty,
  );

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={difficultySelectId}
        className="inline-block text-sm text-gray-500"
      >
        Choose difficulty level
      </label>
      <Select value={difficulty} onValueChange={setDifficulty}>
        <SelectTrigger id={difficultySelectId}>
          {selectedDifficulty && (
            <div className="flex flex-col gap-1">
              <span>{selectedDifficulty.label}</span>
            </div>
          )}

          {!selectedDifficulty && (
            <SelectValue placeholder="Select a difficulty" />
          )}
        </SelectTrigger>
        <SelectContent>
          {difficultyOptions.map((option) => (
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
