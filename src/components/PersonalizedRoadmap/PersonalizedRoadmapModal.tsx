import { PersonStandingIcon, Trash2 } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';
import { Modal } from '../Modal';
import { queryClient } from '../../stores/query-client';
import { aiLimitOptions } from '../../queries/ai-course';
import { useQuery } from '@tanstack/react-query';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

type PersonalizedRoadmapModalProps = {
  onClose: () => void;
  info: string;
  onSubmit: (information: string) => void;
  onClearProgress: () => void;
};

export function PersonalizedRoadmapModal(props: PersonalizedRoadmapModalProps) {
  const {
    onClose,
    info: infoProp,
    onSubmit: onSubmitProp,
    onClearProgress,
  } = props;

  const [info, setInfo] = useState(infoProp);
  const infoFieldId = useId();

  const { data: limits, isLoading: isLimitLoading } = useQuery(
    aiLimitOptions(),
    queryClient,
  );

  const hasReachedLimit =
    limits?.used && limits?.limit ? limits.used >= limits.limit : false;
  console.log(limits);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitProp(info);
  };

  if (hasReachedLimit) {
    return <UpgradeAccountModal onClose={onClose} />;
  }

  return (
    <Modal
      onClose={onClose}
      wrapperClassName="h-auto"
      overlayClassName="items-start md:items-center"
      bodyClassName="rounded-2xl"
    >
      <form onSubmit={handleSubmit} className="p-4">
        <h2 className="text-lg font-semibold">Personalize Roadmap</h2>
        <div className="mt-0.5 flex flex-col gap-2">
          <label htmlFor={infoFieldId} className="text-balance text-gray-600">
            Tell us about yourself to personlize this roadmap as per your goals
            and experience
          </label>
          <textarea
            id={infoFieldId}
            className="h-[150px] w-full resize-none rounded-xl border border-gray-200 p-3 focus:border-gray-500 focus:outline-none"
            placeholder="e.g. I am a beginner, give me a simpler version of the roadmap"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            autoFocus
          />
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-red-200 p-2 px-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none"
            onClick={onClearProgress}
          >
            <Trash2 className="h-4 w-4" />
            Reset
          </button>
          <button
            type="submit"
            disabled={!info.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-black p-2 px-2 text-white hover:opacity-90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PersonStandingIcon className="h-4 w-4" />
            Personalize
          </button>
        </div>
      </form>
    </Modal>
  );
}
