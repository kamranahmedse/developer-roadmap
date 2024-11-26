import {
  BookIcon,
  CalendarIcon,
  CodeXmlIcon,
  LetterTextIcon,
  ShapesIcon,
  UsersIcon,
} from 'lucide-react';
import { Rating } from '../Rating/Rating';
import { CourseStatPill } from './CourseStatPill';
import { useRef, useState, useEffect } from 'react';
import { cn } from '../../lib/classname';
import { CourseInfoCard } from './CourseInfoCard';
import { ChevronDownIcon } from '../ReactIcons/ChevronDownIcon';
import { CourseChapterItem } from './CourseChapterItem';
import { CourseFloatingSidebar } from './CourseFloatingSidebar';

const DUMMY_COURSE_CONTENT = [
  {
    title: 'Introduction to SQL',
    lessons: [
      {
        type: 'lesson',
        title: 'What is SQL?',
      },
      {
        type: 'lesson',
        title: 'Why use SQL?',
      },
      {
        type: 'lesson',
        title: 'SQL Syntax',
      },
      {
        type: 'quiz',
        title: 'Quiz 1',
      },
      {
        type: 'challenge',
        title: 'Challenge 1',
      },
    ],
  },
  {
    title: 'Basic SQL Queries',
    lessons: [
      {
        type: 'lesson',
        title: 'SELECT Statement',
      },
      {
        type: 'lesson',
        title: 'WHERE Clause',
      },
      {
        type: 'lesson',
        title: 'ORDER BY Clause',
      },
      {
        type: 'quiz',
        title: 'Quiz 2',
      },
      {
        type: 'challenge',
        title: 'Challenge 2',
      },
    ],
  },
  {
    title: 'Advanced SQL Queries',
    lessons: [
      {
        type: 'lesson',
        title: 'JOIN Clause',
      },
      {
        type: 'lesson',
        title: 'GROUP BY Clause',
      },
      {
        type: 'lesson',
        title: 'HAVING Clause',
      },
      {
        type: 'quiz',
        title: 'Quiz 3',
      },
      {
        type: 'challenge',
        title: 'Challenge 3',
      },
    ],
  },
  {
    title: 'SQL Functions',
    lessons: [
      {
        type: 'lesson',
        title: 'COUNT() Function',
      },
      {
        type: 'lesson',
        title: 'SUM() Function',
      },
      {
        type: 'lesson',
        title: 'AVG() Function',
      },
      {
        type: 'quiz',
        title: 'Quiz 4',
      },
      {
        type: 'challenge',
        title: 'Challenge 4',
      },
    ],
  },
  {
    title: 'Database Design',
    lessons: [
      {
        type: 'lesson',
        title: 'Normalization',
      },
      {
        type: 'lesson',
        title: 'Denormalization',
      },
      {
        type: 'lesson',
        title: 'Indexes',
      },
      {
        type: 'quiz',
        title: 'Quiz 5',
      },
      {
        type: 'challenge',
        title: 'Challenge 5',
      },
    ],
  },
  {
    title: 'Optimizing Queries',
    lessons: [
      {
        type: 'lesson',
        title: 'Query Optimization',
      },
      {
        type: 'lesson',
        title: 'Indexing',
      },
      {
        type: 'lesson',
        title: 'Query Caching',
      },
    ],
  },
];

export function CourseLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const handleScroll = () => {
      setIsSticky(window.scrollY > container.offsetTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return (
    <>
      <div className="bg-slate-900 py-5 text-white sm:py-8">
        <div className="container grid grid-cols-5 gap-6">
          <div className="col-start-1 col-end-4 space-y-4">
            <p className="flex items-center gap-1 text-sm text-slate-400">
              <a>Home</a> / <a>Courses</a> / <a>Learn SQL</a>
            </p>

            <h1 className="mt-8 text-5xl font-bold">SQL 101</h1>

            <div className="flex items-center gap-2">
              <CourseStatPill
                icon={ShapesIcon}
                label="Difficulty Beginner"
                className="border-none p-0 text-slate-400"
              />
              <CourseStatPill
                icon={CalendarIcon}
                label="Updated 5 days ago"
                className="border-none p-0 text-slate-400"
              />
            </div>

            <p className="text-sm">
              Learn everything you need to know about SQL with an interactive
              playground. It comes with a built-in editor and a database to
              practice your queries.
            </p>

            <div className="flex items-center gap-2 text-sm">
              <span>4.5</span>
              <Rating rating={4.5} />
              <span>(559 ratings)</span>
            </div>

            <div className="flex items-center gap-2">
              <CourseStatPill icon={UsersIcon} label="4.5k users enrolled" />
              <CourseStatPill icon={LetterTextIcon} label="20 Lessons" />
              <CourseStatPill icon={CodeXmlIcon} label="35 Challenges" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div
          className="container grid grid-cols-5 gap-6 py-8"
          ref={containerRef}
        >
          <div className="col-start-1 col-end-4 space-y-4">
            <CourseInfoCard title="What you'll learn">
              <ul className="flex list-inside list-disc flex-col gap-1 text-sm text-gray-700 marker:text-gray-400">
                <li>Understand SQL syntax</li>
                <li>Write complex queries</li>
                <li>Use SQL in real-world scenarios</li>
                <li>Optimize your queries</li>
                <li>Understand database design</li>
                <li>Write complex queries</li>
              </ul>
            </CourseInfoCard>
            <CourseInfoCard title="About this Course">
              <div className="prose-sm mt-4">
                <p>
                  SQL 101 is a beginner-friendly course that will teach you
                  everything you need to know about SQL. It comes with an
                  interactive playground where you can practice your queries.
                </p>
                <p>
                  The course is divided into multiple sections, each covering a
                  different aspect of SQL. You'll learn how to write complex
                  queries, use SQL in real-world scenarios, optimize your
                  queries, and understand database design.
                </p>
              </div>
            </CourseInfoCard>

            <CourseInfoCard title="Course Content">
              {DUMMY_COURSE_CONTENT.map((section, index) => {
                const { title, lessons } = section;
                const isFirst = index === 0;
                const isLast = index === DUMMY_COURSE_CONTENT.length - 1;

                return (
                  <CourseChapterItem
                    key={title}
                    title={title}
                    lessons={lessons}
                    className={cn(
                      isFirst ? 'rounded-t-md' : '',
                      isLast ? 'rounded-b-md' : 'border-b-0',
                    )}
                  />
                );
              })}
            </CourseInfoCard>
          </div>
          <div className="col-start-4 col-end-6">
            <CourseFloatingSidebar isSticky={isSticky} />
          </div>
        </div>
      </div>
    </>
  );
}
