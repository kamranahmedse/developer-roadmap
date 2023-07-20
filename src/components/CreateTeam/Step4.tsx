import { CheckIcon } from '../ReactIcons/CheckIcon';
import type { TeamDocument } from './CreateTeamForm';

type Step4Props = {
  team: TeamDocument;
};

export function Step4({ team }: Step4Props) {
  return (
    <div className="mt-4 flex flex-col rounded-xl border py-12 text-center">
      <div class="mb-1 flex flex-col items-center">
        <CheckIcon additionalClasses={'h-14 w-14 mb-4 opacity-100'} />
        <h2 class="mb-2 text-2xl font-bold">Team Created</h2>
        <p class="text-sm text-gray-700">
          Your team has been created. Happy learning!
        </p>
        <a
          href={`/team/progress?t=${team._id}`}
          class="mt-4 rounded-md bg-black px-5 py-1.5 text-sm text-white"
        >
          View Team
        </a>
      </div>
    </div>
  );
}
