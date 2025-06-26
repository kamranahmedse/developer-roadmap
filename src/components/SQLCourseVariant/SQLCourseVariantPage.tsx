import {
    BrainIcon,
    ClipboardIcon,
    CodeIcon,
    Eye,
    FileCheckIcon,
    FileQuestionIcon,
} from 'lucide-react';
import { AuthorCredentials } from '../SQLCourse/AuthorCredentials';
import { AuthorQuoteMessage } from '../SQLCourse/AuthorQuoteMessage';
import { BuyButton } from '../SQLCourse/BuyButton';
import { ChapterRow } from '../SQLCourse/ChapterRow';
import { CourseAuthor } from '../SQLCourse/CourseAuthor';
import { CourseFeature } from '../SQLCourse/CourseFeature';
import { FAQSection } from '../SQLCourse/FAQSection';
import { FloatingPurchase } from '../SQLCourse/FloatingPurchase';
import { PlatformDemo } from '../SQLCourse/PlatformDemo';
import { ReviewsSection } from '../SQLCourse/ReviewsSection';
import { SectionHeader } from '../SQLCourse/SectionHeader';
import { Spotlight } from '../SQLCourse/Spotlight';
import { sqlCourseChapters } from '../SQLCourse/SQLCoursePage';
import { RoadmapLogoIcon } from '../ReactIcons/RoadmapLogo';

export function SQLCourseVariantPage() {
  return (
    <>
      <div className="relative flex grow flex-col items-center bg-linear-to-b from-zinc-900 to-zinc-950 px-4 pt-3 pb-52 text-zinc-400 md:px-10 md:pt-8">
        <div className="relative mt-7 max-w-4xl text-left md:mt-20 md:text-center">
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

          <AuthorCredentials />
          <p className="mx-auto my-5 max-w-2xl text-xl text-zinc-300 md:my-12 lg:text-2xl">
            A structured course to master database querying - perfect for
            developers, data analysts, and anyone working with data.
          </p>

          <div className="hidden flex-row items-center justify-center gap-5 md:flex">
            <div className="flex flex-row items-center gap-2">
              <ClipboardIcon className="size-6 text-yellow-600" />
              <span>55+ Lessons</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <FileQuestionIcon className="size-6 text-yellow-600" />
              <span>100+ Challenges</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <CodeIcon className="size-6 text-yellow-600" />
              <span>Integrated IDE</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <BrainIcon className="size-6 text-yellow-600" />
              <span>AI Tutor</span>
            </div>
          </div>

          <div className="mt-7 flex justify-start md:mt-12 md:justify-center">
            <BuyButton variant="main" />
          </div>
        </div>

        <ReviewsSection />

        <PlatformDemo />

        <AuthorQuoteMessage />

        <SectionHeader
          title="Not your average SQL course"
          description="Built around a text-based interactive approach and packed with practical challenges, this comprehensive SQL bootcamp stands out with features that make it truly unique."
          className="mt-16 md:mt-20"
        />

        <div className="mx-auto mt-6 w-full max-w-5xl md:mt-10">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            <CourseFeature
              title="Textual Course"
              icon={Eye}
              imgUrl="https://assets.roadmap.sh/guest/textual-course.png"
              description="Unlike video-based courses where you have to learn at the pace of the instructor, this course is text-based, allowing you to learn at your own pace."
            />
            <CourseFeature
              title="Coding Environment"
              icon={CodeIcon}
              imgUrl="https://assets.roadmap.sh/guest/coding-environment.png"
              description="With the integrated IDE, you can practice your SQL queries in real-time, getting instant feedback on your results."
            />
            <CourseFeature
              title="Practical Challenges"
              icon={FileQuestionIcon}
              imgUrl="https://assets.roadmap.sh/guest/coding-challenges.png"
              description="The course is packed with practical challenges and quizzes, allowing you to test your knowledge and skills."
            />
            <CourseFeature
              title="AI Instructor"
              icon={BrainIcon}
              description="Powerful AI tutor to help you with your queries, provide additional explanations and help if you get stuck."
              imgUrl="https://assets.roadmap.sh/guest/ai-integration.png"
            />
            <CourseFeature
              title="Take Notes"
              icon={ClipboardIcon}
              description="The course allows you to take notes, where you can write down your thoughts and ideas. You can visit them later to review your progress."
              imgUrl="https://assets.roadmap.sh/guest/course-notes.png"
            />
            <CourseFeature
              title="Completion Certificate"
              icon={FileCheckIcon}
              imgUrl="https://assets.roadmap.sh/guest/course-certificate.jpg"
              description="The course provides a completion certificate, which you can share with your potential employers."
            />
          </div>
        </div>

        <div className="mt-7 w-full max-w-3xl text-left md:mt-9">
          <p className="text-lg leading-normal md:text-xl">
            Oh, and you get the{' '}
            <span className="bg-linear-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
              lifetime access
            </span>{' '}
            to the course including all the future updates. Also, there is a
            certificate of completion which you can share with your potential
            employers.
          </p>
        </div>

        <SectionHeader
          title="Course Overview"
          description="This SQL programming class is designed to help you go from beginner to expert through hands-on practice with real-world scenarios, mastering everything from basic to complex queries."
          className="mt-8 md:mt-24"
        />

        <div className="mt-8 w-full max-w-3xl space-y-4 md:mt-12">
          {sqlCourseChapters.map((chapter, index) => (
            <ChapterRow key={index} counter={index + 1} {...chapter} />
          ))}
        </div>

        <SectionHeader
          title="About the Author"
          className="mt-12 md:mt-24"
          description={
            <div className="mt-2 flex flex-col gap-4 text-lg leading-[1.52] md:mt-4 md:gap-6 md:text-xl">
              <p>
                I am Kamran Ahmed, an engineering leader with over a decade of
                experience in the tech industry. Throughout my career I have
                built and scaled software systems, architected complex data
                systems, and worked with large amounts of data to create
                efficient solutions.
              </p>
              <p>
                I am also the creator of{' '}
                <a
                  href="https://roadmap.sh"
                  target="_blank"
                  className="text-yellow-400"
                >
                  roadmap.sh
                </a>
                , a platform trusted by millions of developers to guide their
                learning journeys. I love to simplify complex topics and make
                learning practical and accessible.
              </p>
              <p>
                In this course, I will share everything I have learned about SQL
                from the basics to advanced concepts in a way that is easy to
                understand and apply. Whether you are just starting or looking
                to sharpen your skills, you are in the right place.
              </p>
            </div>
          }
        />

        <CourseAuthor />

        <FAQSection />

        <FloatingPurchase />

        <div className="mt-12 w-full max-w-3xl text-left md:mt-9">
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
    </>
  );
}
