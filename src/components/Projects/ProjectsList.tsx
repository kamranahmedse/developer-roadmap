import { ProjectCard } from './ProjectCard.tsx';
import { Diff, HeartHandshake } from 'lucide-react';
import { cn } from '../../lib/classname.ts';
import { useState } from 'react';

type DifficultyButtonProps = {
  difficulty: 'beginner' | 'intermediate' | 'senior';
  isActive?: boolean;
  onClick?: () => void;
};

function DifficultyButton(props: DifficultyButtonProps) {
  const { difficulty, onClick, isActive } = props;

  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-md border bg-white px-3 py-1 text-sm capitalize transition-colors hover:border-gray-300 hover:bg-gray-100',
        {
          'border-black bg-gray-100 hover:border-black hover:bg-gray-100 hover:text-black':
            isActive,
        },
      )}
    >
      {difficulty}
    </button>
  );
}

export function ProjectsList() {
  const [difficulty, setDifficulty] = useState<
    'beginner' | 'intermediate' | 'senior'
  >();

  return (
    <div className="flex flex-col">
      <div className="my-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <DifficultyButton
            onClick={() => {
              setDifficulty('beginner');
            }}
            difficulty={'beginner'}
            isActive={difficulty === 'beginner'}
          />
          <DifficultyButton
            onClick={() => {
              setDifficulty('intermediate');
            }}
            difficulty={'intermediate'}
            isActive={difficulty === 'intermediate'}
          />
          <DifficultyButton
            onClick={() => {
              setDifficulty('senior');
            }}
            difficulty={'senior'}
            isActive={difficulty === 'senior'}
          />
        </div>
        <a
          href={''}
          className="flex items-center gap-2 rounded-md border border-transparent px-2 py-0.5 text-sm underline underline-offset-2 hover:bg-black hover:text-white hover:no-underline"
        >
          <HeartHandshake className="h-4 w-4" />
          Submit a Project Idea
        </a>
      </div>
      <div className="mb-24 grid grid-cols-3 gap-1.5">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
}
