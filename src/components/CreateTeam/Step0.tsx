import BuildingIcon from '../../icons/building.svg';
import UsersIcon from '../../icons/users.svg';

export const validTeamTypes = [
  {
    value: 'company',
    label: 'Company',
    icon: BuildingIcon,
    description: 'Use roadmap.sh for your company',
  },
  {
    value: 'learning_club',
    label: 'Learning Club',
    icon: UsersIcon,
    description: 'Invite your friends and learn together',
  },
] as const;

export type ValidTeamType = (typeof validTeamTypes)[number]['value'];

type Step0Props = {
  selectedTeamType: ValidTeamType;
  setSelectedTeamType: (teamType: ValidTeamType) => void;
  onStepComplete: () => void;
};

export function Step0(props: Step0Props) {
  const { selectedTeamType, onStepComplete, setSelectedTeamType } = props;

  return (
    <>
      <div className={'flex flex-row gap-3'}>
        {validTeamTypes.map((validTeamType) => (
          <button
            className={`flex flex-grow flex-col items-center rounded-lg border px-5 py-12 ${
              validTeamType.value == selectedTeamType
                ? 'border-gray-400 bg-gray-100'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedTeamType(validTeamType.value)}
          >
            <img
              alt={validTeamType.label}
              src={validTeamType.icon}
              className={`mb-3 h-12 w-12 opacity-10 ${
                validTeamType.value === selectedTeamType ? 'opacity-100' : ''
              }`}
            />
            <span className="mb-1 block text-2xl font-bold">
              {validTeamType.label}
            </span>
            <span className="text-sm text-gray-500">
              {validTeamType.description}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-row items-center justify-between gap-2">
        <a
          href="/account"
          className={
            'rounded-md border border-red-400 bg-white px-8 py-2 text-red-500'
          }
        >
          Cancel
        </a>
        <button
          onClick={() => onStepComplete()}
          disabled={!selectedTeamType}
          className={
            'rounded-md border bg-black px-4 py-2 text-white disabled:opacity-20'
          }
        >
          Next Step&nbsp;
          <span className="ml-1">&rarr;</span>
        </button>
      </div>
    </>
  );
}
