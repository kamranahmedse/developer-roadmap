import {
  BrainIcon,
  CodeIcon,
  FileQuestionIcon,
  NotebookTextIcon,
} from 'lucide-react';
import { Spotlight } from '../SQLCourse/Spotlight';
import { RoadmapLogoIcon } from '../ReactIcons/RoadmapLogo';
import { AuthorCredentials } from './AuthorCredentials';
import { PlatformDemo } from './PlatformDemo';
import { PurchaseBanner } from './PurchaseBanner';
import { ReviewCarousel } from './ReviewCarousel';
import { CourseFeatures } from './CourseFeatures';
import { MeetYourInstructor } from './MeetYourInstructor';
import { SectionHeader } from './SectionHeader';
import { ChapterRow } from './ChapterRow';
import { BuyButton } from './BuyButton';
import { FAQSection } from './FAQSection';
import { sqlCourseChapters } from '../SQLCourse/SQLCoursePage';

export function SQLCourseVariantPage() {
  return (
    <div className="relative flex grow flex-col items-center bg-linear-to-b from-zinc-900 to-zinc-950 px-4 pb-52 text-zinc-400 md:px-10">
      <div className="mx-auto mt-7 w-full max-w-5xl md:mt-20">
        <div className="relative">
          <Spotlight className="top-[-200px] left-[-170px]" fill="#EAB308" />

          <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
            <a
              href="https://roadmap.sh"
              target="_blank"
              className="transition-opacity hover:opacity-100"
            >
              <RoadmapLogoIcon className="size-12 sm:size-22" />
            </a>
            <div className="flex flex-col items-start gap-2.5">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-6xl">
                Master SQL Queries
              </h1>
              <p className="text-left text-xl text-balance text-zinc-300 md:text-2xl">
                Complete course with AI Tutor, real-world challenges and more
              </p>
            </div>
          </div>

          <p className="my-5 text-xl leading-relaxed text-zinc-300 md:my-10 lg:text-xl">
            Get certified for SQL queries and ready to deploy your newly-gained
            skill in 30 days. Perfect for developers, data analysts, and anyone
            working with data. Level up risk-free with a 7-day money-back
            guarantee.
          </p>

          <div className="flex flex-col-reverse gap-7 lg:flex-row lg:gap-14">
            <div className="w-full shrink-0 flex-row-reverse items-start justify-between gap-3 text-lg md:flex lg:w-auto lg:flex-col">
              <div className="mb-7 flex flex-col gap-2 lg:mb-0 lg:gap-4">
                {[
                  { Icon: NotebookTextIcon, text: '55+ Lessons' },
                  { Icon: FileQuestionIcon, text: '100+ Challenges' },
                  { Icon: BrainIcon, text: 'AI Tutor' },
                  { Icon: CodeIcon, text: 'Integrated IDE' },
                ].map(({ Icon, text }, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center gap-2 text-base text-zinc-300 lg:text-xl"
                  >
                    <Icon className="size-5 text-yellow-400 lg:size-6" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <AuthorCredentials />
            </div>

            <PlatformDemo />
          </div>
        </div>

        <PurchaseBanner />

        <ReviewCarousel />

        <CourseFeatures />

        <MeetYourInstructor />

        <SectionHeader
          title="Course Overview"
          description="This SQL programming class is designed to help you go from beginner to expert through hands-on practice with real-world scenarios, mastering everything from basic to complex queries."
          className="mt-8 md:mt-24"
        />

        <div className="mx-auto mt-8 w-full max-w-3xl space-y-4 md:mt-12">
          {sqlCourseChapters.map((chapter, index) => (
            <ChapterRow key={index} counter={index + 1} {...chapter} />
          ))}
        </div>

        <SectionHeader
          title="Ready to master SQL?"
          description="Start learning SQL queries risk-free with a 7-day money-back guarantee."
          className="mt-8 md:mt-24"
        />

        <div className="mx-auto mt-8 w-full">
          <BuyButton variant="floating" />
        </div>

        <FAQSection />

        <div className="mx-auto mt-12 w-full max-w-3xl text-left md:mt-9">
          <p className="flex flex-col items-center justify-center gap-2 text-sm md:flex-row md:gap-0">
            <a href="/terms" target="_blank" className="text-zinc-500">
              Terms of Use
            </a>
            <span className="mx-4 hidden md:block">&middot;</span>
            <a href="/privacy" target="_blank" className="text-zinc-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
