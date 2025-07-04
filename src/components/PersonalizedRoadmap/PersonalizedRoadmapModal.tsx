import { usePersonalizedRoadmap } from '../../hooks/use-personalized-roadmap';
import { renderTopicProgress } from '../../lib/resource-progress';
import { Modal } from '../Modal';
import { PersonalizedRoadmapForm } from './PersonalizedRoadmapForm';

type PersonalizedRoadmapModalProps = {
  onClose: () => void;
  onSubmit: (information: string) => void;
  onClearProgress: () => void;
};

export function PersonalizedRoadmapModal(props: PersonalizedRoadmapModalProps) {
  const { onClose, onSubmit, onClearProgress } = props;

  return (
    <Modal onClose={onClose} bodyClassName="rounded-2xl">
      <PersonalizedRoadmapForm
        onSubmit={onSubmit}
        onClearProgress={onClearProgress}
      />
    </Modal>
  );
}
