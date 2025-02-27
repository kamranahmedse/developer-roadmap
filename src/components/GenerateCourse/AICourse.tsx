import { Loader2, Search, Wand } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/classname';
import { AICourseGenerateForm } from './AICourseGenerateForm';
import { AICourseContent } from './AICourseContent';

export const difficultyLevels = [
  'beginner',
  'intermediate',
  'advanced',
] as const;
export type DifficultyLevel = (typeof difficultyLevels)[number];

type AICourseProps = {
  courseId?: string;
};

export function AICourse(props: AICourseProps) {
  const [keyword, setKeyword] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('intermediate');

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingError, setIsGeneratingError] = useState(false);

  function onSubmit() {
    setIsGenerating(true);
    setIsGeneratingError(false);
  }

  return (
    <>
      {!isGenerating && (
        <AICourseGenerateForm
          keyword={keyword}
          setKeyword={setKeyword}
          difficulty={difficulty}
          setDifficulty={(difficulty) =>
            setDifficulty(difficulty as DifficultyLevel)
          }
          onSubmit={onSubmit}
          isGenerating={isGenerating}
        />
      )}

      {isGenerating && (
        <AICourseContent term={keyword} difficulty={difficulty} />
      )}
    </>
  );
}
