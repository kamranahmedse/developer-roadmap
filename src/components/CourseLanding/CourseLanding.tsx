import {
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

      <div className="container grid grid-cols-5 gap-6 py-8" ref={containerRef}>
        <div className="col-start-1 col-end-4 space-y-4">
          <div className="rounded-md border p-4">
            <h2 className="text-xl font-medium">What you'll learn</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              <li>Understand SQL syntax</li>
              <li>Write complex queries</li>
              <li>Use SQL in real-world scenarios</li>
              <li>Optimize your queries</li>
              <li>Understand database design</li>
              <li>Write complex queries</li>
            </ul>
          </div>

          <div className="rounded-md border p-4">
            <h2 className="text-xl font-medium">About this Course</h2>

            <div className="prose mt-4">
              <p>
                SQL 101 is a beginner-friendly course that will teach you
                everything you need to know about SQL. It comes with an
                interactive playground where you can practice your queries.
              </p>

              <p>
                The course is divided into multiple sections, each covering a
                different aspect of SQL. You'll learn how to write complex
                queries, use SQL in real-world scenarios, optimize your queries,
                and understand database design.
              </p>
            </div>

            <div className="h-[1000px]"></div>
          </div>
        </div>

        <div className="col-start-4 col-end-6">
          <div
            className={cn(
              'sticky top-8 -translate-y-1/2 overflow-hidden rounded-lg border bg-white transition-transform',
              isSticky && '-translate-y-0',
            )}
          >
            <figure>
              <img
                src="https://images.unsplash.com/photo-1732200584655-3511db5c24e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                alt="SQL 101"
                className="aspect-video w-full object-cover"
              />
            </figure>

            <div className="p-2">
              <button className="flex w-full items-center justify-between gap-1 rounded-lg border p-2 px-3">
                <span>Enroll now</span>
                <span>5$ / month</span>
              </button>
            </div>

            <div className="border-b p-2 pb-4">
              <h4 className="text-lg font-medium">Certificate of Completion</h4>
              <p className="text-xs text-gray-500">
                Certificate will be issued on completion
              </p>

              <figure className="mt-4">
                <img
                  src="https://images.unsplash.com/photo-1732465286852-a0b95393a90d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D"
                  alt="SQL 101"
                  className="aspect-video w-full rounded-lg object-cover"
                />
              </figure>
            </div>

            <div className="p-2">
              <h4 className="text-lg font-medium">What you get</h4>
              <ul
                role="list"
                className="mt-2 list-disc pl-4 text-sm text-gray-700 marker:text-gray-400"
              >
                <li>Full access to all the courses</li>
                <li>Personalized access using AI</li>
                <li>Certificate of Completion</li>
                <li>Playground for live-coding</li>
                <li>Challenges / Quizes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
