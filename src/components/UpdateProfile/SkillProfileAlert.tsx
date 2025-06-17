import { CheckCircle, FileBadge } from 'lucide-react';

const ideas = [
  'Add a link to your profile in your social media bio',
  'Include your profile link in your resume to showcase your skills',
  'Add a link to your profile in your email signature',
  'Showcase your skills in your GitHub profile',
  'Share your profile with potential employers',
];

export function SkillProfileAlert() {
  return (
    <div className="relative mb-5 rounded-lg bg-yellow-200 px-3 py-3 text-sm text-yellow-800">
      <FileBadge className="absolute hidden sm:block bottom-3 right-3 h-20 w-20 stroke-2 text-yellow-500 opacity-50" />

      <h2 className="mb-1 text-base font-semibold">
        Announcing Skill Profiles!{' '}
      </h2>
      <p className="text-sm">
        Create your skill profile to showcase your skills or learning progress.
        Here are some of the ways you can use your skill profile:
      </p>

      <div className="my-3 ml-2 flex flex-col gap-1 sm:ml-3">
        {ideas.map((idea) => (
          <p
            key={idea}
            className="flex flex-row items-start gap-1.5 sm:items-center"
          >
            <CheckCircle className="relative top-[3px] h-3.5 w-3.5 shrink-0 stroke-[2.5] sm:top-0" />
            <span>{idea}</span>
          </p>
        ))}
      </div>

      <p className="text-sm">
        Make sure to mark your expertise{' '}
        <a
          href="/roadmaps"
          target="_blank"
          className="font-semibold underline underline-offset-2"
        >
          in the roadmaps.
        </a>
      </p>
    </div>
  );
}
