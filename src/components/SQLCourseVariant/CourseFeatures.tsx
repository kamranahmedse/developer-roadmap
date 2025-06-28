import {
  BookIcon,
  BrainIcon,
  ClipboardIcon,
  CodeIcon,
  FileCheckIcon,
  FileQuestionIcon,
  MinusIcon,
  PlusIcon,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useState } from 'react';
import { cn } from '../../lib/classname';

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
  imgUrl: string;
};

export function CourseFeatures() {
  const features: Feature[] = [
    {
      title: 'AI Tutor',
      description:
        'Powerful AI tutor to help you with your queries, provide additional explanations and help if you get stuck.',
      icon: BrainIcon,
      imgUrl: 'https://assets.roadmap.sh/guest/ai-integration.png',
    },
    {
      title: 'Real-world Challenges',
      description:
        'The course is packed with practical challenges and quizzes, allowing you to test your knowledge and skills.',
      icon: FileQuestionIcon,
      imgUrl: 'https://assets.roadmap.sh/guest/coding-challenges.png',
    },
    {
      title: 'Coding Environment',
      description:
        'With the integrated IDE, you can practice your SQL queries in real-time, getting instant feedback on your results.',
      icon: CodeIcon,
      imgUrl: 'https://assets.roadmap.sh/guest/coding-environment.png',
    },
    {
      title: 'Textual Course',
      description:
        'Unlike video-based courses where you have to learn at the pace of the instructor, this course is text-based, allowing you to learn at your own pace.',
      icon: BookIcon,
      imgUrl: 'https://assets.roadmap.sh/guest/textual-course.png',
    },
    {
      title: 'Take Notes',
      description:
        'The course allows you to take notes, where you can write down your thoughts and ideas. You can visit them later to review your progress.',
      icon: ClipboardIcon,
      imgUrl: 'https://assets.roadmap.sh/guest/course-notes.png',
    },
    {
      title: 'Completion Certificate',
      description:
        'The course provides a completion certificate, which you can share with your potential employers.',
      icon: FileCheckIcon,
      imgUrl: 'https://assets.roadmap.sh/guest/course-certificate.jpg',
    },
  ];

  const [expandedFeatureIndex, setExpandedFeatureIndex] = useState<
    number | null
  >(0);

  return (
    <div>
      <SectionHeader
        title="Not your average SQL course"
        description="Built around a text-based interactive approach and packed with practical challenges, this comprehensive SQL bootcamp stands out with features that make it truly unique."
      />

      <div className="mx-auto mt-10 w-full max-w-3xl divide-y divide-zinc-800 overflow-hidden rounded-xl border border-zinc-800">
        {features.map((feature, index) => (
          <CourseFeature
            key={feature.title}
            {...feature}
            isExpanded={expandedFeatureIndex === index}
            onExpand={() =>
              setExpandedFeatureIndex(
                expandedFeatureIndex === index ? null : index,
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

type CourseFeatureProps = Feature & {
  isExpanded?: boolean;
  onExpand?: () => void;
};

function CourseFeature(props: CourseFeatureProps) {
  const {
    title,
    description,
    icon: Icon,
    imgUrl,
    isExpanded,
    onExpand,
  } = props;

  return (
    <div>
      <button
        className={cn(
          'flex w-full items-center justify-between gap-2 px-5 py-3 hover:bg-transparent',
          !isExpanded && 'bg-zinc-900',
        )}
        onClick={onExpand}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 shrink-0 text-yellow-600" />
          <h3 className={cn('text-lg', isExpanded && 'text-zinc-200')}>
            {title}
          </h3>
        </div>

        <div className="text-zinc-400 hover:text-zinc-300">
          {isExpanded ? (
            <MinusIcon className="h-5 w-5" />
          ) : (
            <PlusIcon className="h-5 w-5" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="grid gap-4 px-5 py-3 sm:grid-cols-2">
          <p className="text-lg text-balance text-white">{description}</p>
          <img
            src={imgUrl}
            alt={title}
            className="h-full w-full rounded-lg sm:order-2"
          />
        </div>
      )}
    </div>
  );
}
