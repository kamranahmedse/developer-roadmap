import { useState, type CSSProperties } from 'react';
import { formatCommaNumber } from '../../lib/number';
import { Modal } from '../Modal';
import { Rating } from '../Rating/Rating';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import { RateRoadmapForm } from './RateRoadmapForm';

type CustomRoadmapRatingsModalProps = {
  onClose: () => void;
  roadmapSlug: string;
  ratings: RoadmapDocument['ratings'];
};

export function CustomRoadmapRatingsModal(
  props: CustomRoadmapRatingsModalProps,
) {
  const { onClose, ratings, roadmapSlug } = props;

  return (
    <Modal onClose={onClose} bodyClassName="p-4">
      <RateRoadmapForm ratings={ratings} roadmapSlug={roadmapSlug} />
    </Modal>
  );
}
