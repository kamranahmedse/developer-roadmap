import type { EgeSubject, EgeTopic } from '../data/ege';

const DIFFICULTY_WEIGHTS: Record<NonNullable<EgeTopic['difficulty']>, number> =
  {
    easy: 1,
    medium: 2,
    hard: 3,
  };

export type EgePlanLength = 3 | 6 | 12;

export type EgeScheduledItem = {
  type: 'topic' | 'review';
  title: string;
  description: string;
  topicSlug?: string;
  blockIndex?: number;
  blockTitle?: string;
  reviewTopics?: string[];
  dayStart: number;
  dayEnd: number;
};

export function buildEgeSchedule(
  subject: EgeSubject,
  months: EgePlanLength,
  reviewInterval: number = 4,
): EgeScheduledItem[] {
  const totalDays = months * 28;

  const schedule: EgeScheduledItem[] = [];
  let currentDay = 1;

  const allTopics: EgeTopic[] = subject.blocks.flatMap((block) => block.topics);
  const totalWeight = allTopics.reduce(
    (sum, topic) => sum + DIFFICULTY_WEIGHTS[topic.difficulty ?? 'medium'],
    0,
  );
  const reviewDays = Math.max(0, subject.blocks.length - 1);
  const availableDays = Math.max(1, totalDays - reviewDays);
  const baseDayUnit = totalWeight > 0 ? availableDays / totalWeight : 1;
  const topicAllocations = allTopics.map((topic) => ({
    topic,
    raw: DIFFICULTY_WEIGHTS[topic.difficulty ?? 'medium'] * baseDayUnit,
  }));
  let daysAssigned = topicAllocations.reduce(
    (sum, item) => sum + Math.max(1, Math.floor(item.raw)),
    0,
  );

  if (daysAssigned > availableDays) {
    // Reduce from largest allocations while keeping minimum 1 day
    const indices = topicAllocations
      .map((item, index) => ({
        index,
        value: Math.max(1, Math.floor(item.raw)),
      }))
      .sort((a, b) => b.value - a.value);
    let overflow = daysAssigned - availableDays;
    for (const item of indices) {
      if (overflow <= 0) break;
      if (item.value > 1) {
        item.value -= 1;
        overflow -= 1;
      }
    }
    daysAssigned = availableDays - Math.max(0, overflow);
    indices.sort((a, b) => a.index - b.index);
    topicAllocations.forEach((item, idx) => {
      item.raw = indices[idx]?.value ?? 1;
    });
  } else if (daysAssigned < availableDays) {
    // Distribute remaining days by largest fractional part
    const fractions = topicAllocations
      .map((item, index) => ({
        index,
        frac: item.raw - Math.floor(item.raw),
      }))
      .sort((a, b) => b.frac - a.frac);
    let remaining = availableDays - daysAssigned;
    for (const item of fractions) {
      if (remaining <= 0) break;
      item.frac += 1;
      remaining -= 1;
    }
    const allocationMap = new Map<number, number>();
    fractions.forEach((item) => {
      const base = Math.max(1, Math.floor(topicAllocations[item.index].raw));
      allocationMap.set(item.index, base + (item.frac >= 1 ? 1 : 0));
    });
    topicAllocations.forEach((item, index) => {
      item.raw = allocationMap.get(index) ?? Math.max(1, Math.floor(item.raw));
    });
  } else {
    topicAllocations.forEach((item) => {
      item.raw = Math.max(1, Math.floor(item.raw));
    });
  }

  const allocationBySlug = new Map(
    topicAllocations.map((item) => [item.topic.slug, Math.max(1, Math.round(item.raw))]),
  );

  subject.blocks.forEach((block, blockIndex) => {
    const blockTopics = block.topics;
    const reviewTopics: string[] = [];

    for (const topic of blockTopics) {
      const durationDays = allocationBySlug.get(topic.slug) ?? 1;
      const dayStart = currentDay;
      const dayEnd = Math.min(totalDays, currentDay + durationDays - 1);

      schedule.push({
        type: 'topic',
        title: topic.title,
        description: topic.description,
        topicSlug: topic.slug,
        blockIndex,
        blockTitle: block.title,
        dayStart,
        dayEnd,
      });

      reviewTopics.push(topic.title);
      currentDay = dayEnd + 1;

      if (currentDay > totalDays) {
        return;
      }
    }

    const isLastBlock = blockIndex === subject.blocks.length - 1;
    if (!isLastBlock && currentDay <= totalDays) {
      schedule.push({
        type: 'review',
        title: 'Повторение тем блока',
        description: `Темы: ${reviewTopics.join(', ')}`,
        blockIndex,
        blockTitle: block.title,
        reviewTopics,
        dayStart: currentDay,
        dayEnd: Math.min(totalDays, currentDay),
      });
      currentDay += 1;
    }
  });

  return schedule;
}
