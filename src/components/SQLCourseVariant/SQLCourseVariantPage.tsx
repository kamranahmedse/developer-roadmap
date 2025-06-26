import {
  BrainIcon,
  ClipboardIcon,
  CodeIcon,
  Eye,
  FileCheckIcon,
  FileQuestionIcon,
} from 'lucide-react';
import { Spotlight } from '../SQLCourse/Spotlight';
import { RoadmapLogoIcon } from '../ReactIcons/RoadmapLogo';
import { AuthorCredentials } from './AuthorCredentials';
import { PlatformDemo } from './PlatformDemo';
import { PurchaseBanner } from './PurchaseBanner';

export function SQLCourseVariantPage() {
  return (
    <>
      <div className="relative flex grow flex-col items-center bg-linear-to-b from-zinc-900 to-zinc-950 px-4 pt-3 pb-52 text-zinc-400 md:px-10 md:pt-8">
        <div className="relative mt-7 w-full max-w-5xl md:mt-20">
          <Spotlight className="top-[-200px] left-[-170px]" fill="#EAB308" />

          <div className="flex flex-row items-center gap-5">
            <a
              href="https://roadmap.sh"
              target="_blank"
              className="transition-opacity hover:opacity-100"
            >
              <RoadmapLogoIcon className="size-18" />
            </a>
            <div className="flex flex-col items-start gap-2.5">
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Master SQL Queries
              </h1>
              <p className="text-left text-xl text-zinc-300 md:text-xl">
                Complete course with AI Tutor, real-world challenges and more
              </p>
            </div>
          </div>

          <p className="my-5 text-xl text-balance text-zinc-300 md:my-14 lg:text-2xl">
            Get certified for SQL queries and ready to deploy your newly-gained
            skill in 30 days. Perfect for developers, data analysts, and anyone
            working with data. Level up risk-free with a 7-day money-back
            guarantee.
          </p>

          <div className="flex gap-14">
            <div className="flex shrink-0 flex-col gap-3 text-lg">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-2">
                  <ClipboardIcon className="size-6 text-yellow-600" />
                  <span>55+ Lessons</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <FileQuestionIcon className="size-6 text-yellow-600" />
                  <span>100+ Challenges</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <BrainIcon className="size-6 text-yellow-600" />
                  <span>AI Tutor</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <CodeIcon className="size-6 text-yellow-600" />
                  <span>Integrated IDE</span>
                </div>
              </div>

              <AuthorCredentials />
            </div>

            <PlatformDemo />
          </div>

          <PurchaseBanner />
        </div>
      </div>
    </>
  );
}
