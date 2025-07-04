import { usePersonalizedRoadmap } from '../../hooks/use-personalized-roadmap';
import { renderTopicProgress } from '../../lib/resource-progress';
import { Modal } from '../Modal';
import { PersonalizedRoadmapForm } from './PersonalizedRoadmapForm';

type PersonalizedRoadmapModalProps = {
  roadmapId: string;
  onClose: () => void;
  onSubmit: (information: string) => void;
};

export function PersonalizedRoadmapModal(props: PersonalizedRoadmapModalProps) {
  const { roadmapId, onClose, onSubmit } = props;

  return (
    <Modal onClose={onClose} bodyClassName="rounded-2xl">
      <PersonalizedRoadmapForm onSubmit={onSubmit} />
    </Modal>
  );
}
