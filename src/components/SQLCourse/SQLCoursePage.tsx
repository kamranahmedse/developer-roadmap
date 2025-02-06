import {
  ArrowRightIcon,
  ArrowUpDownIcon,
  BarChartIcon,
  BrainIcon,
  ClipboardIcon,
  CodeIcon,
  DatabaseIcon,
  Eye,
  FileCheckIcon,
  FileQuestionIcon,
  GitBranchIcon,
  GitMergeIcon,
  LayersIcon,
  TableIcon,
  WrenchIcon,
} from 'lucide-react';
import { ChapterRow } from './ChapterRow';
import { CourseFeature } from './CourseFeature';
import { SectionHeader } from './SectionHeader';
import { Spotlight } from './Spotlight';
import { FloatingPurchase } from './FloatingPurchase';
import { CourseAuthor } from './CourseAuthor';
import { FAQSection } from './FAQSection';
import { BuyButton } from './BuyButton';
import { AccountButton } from './AccountButton';
import { RoadmapLogoIcon } from '../ReactIcons/RoadmapLogo';
import { PlatformDemo } from './PlatformDemo';
import { AuthorQuoteMessage } from './AuthorQuoteMessage';
type ChapterData = {
  icon: React.ReactNode;
  title: string;
  description: string;
  lessonCount: number;
  challengeCount: number;
  lessons: { title: string; type: 'lesson' | 'challenge' | 'quiz' }[];
};

export function SQLCoursePage() {
  const chapters: ChapterData[] = [
    {
      icon: <DatabaseIcon className="h-6 w-6 text-yellow-500" />,
      title: 'Introduction',
      description:
        'Get comfortable with database concepts and SQL fundamentals.',
      lessonCount: 4,
      challengeCount: 1,
      lessons: [
        { title: 'Basics of Databases', type: 'lesson' },
        { title: 'What is SQL?', type: 'lesson' },
        { title: 'Types of Queries', type: 'lesson' },
        { title: 'Next Steps', type: 'lesson' },
        { title: 'Introduction Quiz', type: 'challenge' },
      ],
    },
    {
      icon: <TableIcon className="h-6 w-6 text-yellow-500" />,
      title: 'SQL Basics',
      description: 'Master the essential SQL query operations and syntax.',
      lessonCount: 9,
      challengeCount: 7,
      lessons: [
        { title: 'SELECT Fundamentals', type: 'lesson' },
        { title: 'Aliases and Constants', type: 'lesson' },
        { title: 'Expressions in SELECT', type: 'lesson' },
        { title: 'Selecting DISTINCT Values', type: 'lesson' },
        { title: 'Filtering with WHERE', type: 'lesson' },
        { title: 'Sorting with ORDER BY', type: 'lesson' },
        { title: 'Limiting Results with LIMIT', type: 'lesson' },
        { title: 'Handling NULL Values', type: 'lesson' },
        { title: 'Comments', type: 'lesson' },
        { title: 'Basic Queries Quiz', type: 'quiz' },
        { title: 'Projection Challenge', type: 'challenge' },
        { title: 'Select Expression', type: 'challenge' },
        { title: 'Select Unique', type: 'challenge' },
        { title: 'Logical Operators', type: 'challenge' },
        { title: 'Sorting Challenge', type: 'challenge' },
        { title: 'Sorting and Limiting', type: 'challenge' },
        { title: 'Sorting and Filtering', type: 'challenge' },
      ],
    },
    {
      icon: <CodeIcon className="h-6 w-6 text-yellow-500" />,
      title: 'Manipulating Data',
      description: 'Learn how to modify and manipulate data in your database.',
      lessonCount: 3,
      challengeCount: 3,
      lessons: [
        { title: 'INSERT Operations', type: 'lesson' },
        { title: 'UPDATE Operations', type: 'lesson' },
        { title: 'DELETE Operations', type: 'lesson' },
        { title: 'Data Manipulation Quiz', type: 'quiz' },
        { title: 'Inserting Customers', type: 'challenge' },
        { title: 'Updating Bookstore', type: 'challenge' },
        { title: 'Deleting Books', type: 'challenge' },
      ],
    },
    {
      icon: <LayersIcon className="h-6 w-6 text-yellow-500" />,
      title: 'Defining Tables',
      description: 'Master database schema design and table management.',
      lessonCount: 9,
      challengeCount: 7,
      lessons: [
        { title: 'Creating Tables', type: 'lesson' },
        { title: 'Data Types in SQLite', type: 'lesson' },
        { title: 'Common Data Types', type: 'lesson' },
        { title: 'More on Numeric Types', type: 'lesson' },
        { title: 'Temporal Data Types', type: 'lesson' },
        { title: 'CHECK Constraints', type: 'lesson' },
        { title: 'Primary Key Constraint', type: 'lesson' },
        { title: 'Modifying Tables', type: 'lesson' },
        { title: 'Dropping and Truncating', type: 'lesson' },
        { title: 'Defining Tables Quiz', type: 'quiz' },
        { title: 'Simple Table Creation', type: 'challenge' },
        { title: 'Data Types Challenge', type: 'challenge' },
        { title: 'Constraints Challenge', type: 'challenge' },
        { title: 'Temporal Validation', type: 'challenge' },
        { title: 'Sales Data Analysis', type: 'challenge' },
        { title: 'Modifying Tables', type: 'challenge' },
        { title: 'Removing Table Data', type: 'challenge' },
      ],
    },
    {
      icon: <GitMergeIcon className="h-6 w-6 text-yellow-500" />,
      title: 'Multi-Table Queries',
      description:
        'Learn to work with multiple tables using JOINs and relationships.',
      lessonCount: 7,
      challengeCount: 10,
      lessons: [
        { title: 'More on Relational Data', type: 'lesson' },
        { title: 'Relationships and Types', type: 'lesson' },
        { title: 'JOINs in Queries', type: 'lesson' },
        { title: 'Self Joins and Usecases', type: 'lesson' },
        { title: 'Foreign Key Constraint', type: 'lesson' },
        { title: 'Set Operator Queries', type: 'lesson' },
        { title: 'Views and Virtual Tables', type: 'lesson' },
        { title: 'Multi-Table Queries Quiz', type: 'quiz' },
        { title: 'Inactive Customers', type: 'challenge' },
        { title: 'Recent 3 Orders', type: 'challenge' },
        { title: 'High Value Orders', type: 'challenge' },
        { title: 'Specific Book Customers', type: 'challenge' },
        { title: 'Referred Customers', type: 'challenge' },
        { title: 'Readers Like You', type: 'challenge' },
        { title: 'Same Price Books', type: 'challenge' },
        { title: 'Multi-Section Authors', type: 'challenge' },
        { title: 'Expensive Books', type: 'challenge' },
        { title: 'Trending Tech Books', type: 'challenge' },
      ],
    },
    {
      icon: <WrenchIcon className="h-6 w-6 text-yellow-500" />,
      title: 'Aggregate Functions',
      description:
        "Analyze and summarize data using SQL's powerful aggregation features.",
      lessonCount: 4,
      challengeCount: 10,
      lessons: [
        { title: 'What is Aggregation?', type: 'lesson' },
        { title: 'Basic Aggregation', type: 'lesson' },
        { title: 'Grouping Data', type: 'lesson' },
        { title: 'Grouping and Filtering', type: 'lesson' },
        { title: 'Aggregate Queries Quiz', type: 'quiz' },
        { title: 'Book Sales Summary', type: 'challenge' },
        { title: 'Category Insights', type: 'challenge' },
        { title: 'Author Tier Analysis', type: 'challenge' },
        { title: 'Author Book Stats', type: 'challenge' },
        { title: 'Daily Sales Report', type: 'challenge' },
        { title: 'Publisher Stats', type: 'challenge' },
        { title: 'High Value Publishers', type: 'challenge' },
        { title: 'Premium Authors', type: 'challenge' },
        { title: 'Sales Analysis', type: 'challenge' },
        { title: 'Employee Performance', type: 'challenge' },
      ],
    },
    {
      icon: <BarChartIcon className="h-6 w-6 text-yellow-500" />,
      title: 'Scalar Functions',
      description:
        'Master built-in functions for data transformation and manipulation.',
      lessonCount: 6,
      challengeCount: 5,
      lessons: [
        { title: 'What are they?', type: 'lesson' },
        { title: 'String Functions', type: 'lesson' },
        { title: 'Numeric Functions', type: 'lesson' },
        { title: 'Date Functions', type: 'lesson' },
        { title: 'Conversion Functions', type: 'lesson' },
        { title: 'Logical Functions', type: 'lesson' },
        { title: 'Scalar Functions Quiz', type: 'quiz' },
        { title: 'Customer Contact List', type: 'challenge' },
        { title: 'Membership Duration', type: 'challenge' },
        { title: 'Book Performance', type: 'challenge' },
        { title: 'Book Categories', type: 'challenge' },
        { title: 'Monthly Sales Analysis', type: 'challenge' },
      ],
    },
    {
      icon: <GitBranchIcon className="h-6 w-6 text-yellow-500" />,
      title: 'Subqueries and CTEs',
      description:
        'Write complex queries using subqueries and common table expressions.',
      lessonCount: 4,
      challengeCount: 6,
      lessons: [
        { title: 'What are Subqueries?', type: 'lesson' },
        { title: 'Correlated Subqueries', type: 'lesson' },
        { title: 'Common Table Expressions', type: 'lesson' },
        { title: 'Recursive CTEs', type: 'lesson' },
        { title: 'Subqueries Quiz', type: 'quiz' },
        { title: 'Books Above Average', type: 'challenge' },
        { title: 'Latest Category Books', type: 'challenge' },
        { title: 'Low Stock by Category', type: 'challenge' },
        { title: 'Bestseller Rankings', type: 'challenge' },
        { title: 'New Customer Analysis', type: 'challenge' },
        { title: 'Daily Sales Report', type: 'challenge' },
      ],
    },
    {
      icon: <ArrowUpDownIcon className="h-6 w-6 text-yellow-500" />,
      title: 'Window Functions',
      description:
        'Advanced analytics and calculations using window functions.',
      lessonCount: 5,
      challengeCount: 7,
      lessons: [
        { title: 'What are they?', type: 'lesson' },
        { title: 'OVER and PARTITION BY', type: 'lesson' },
        { title: 'Use of ORDER BY', type: 'lesson' },
        { title: 'Ranking Functions', type: 'lesson' },
        { title: 'Window Frames', type: 'lesson' },
        { title: 'Window Functions Quiz', type: 'quiz' },
        { title: 'Basic Sales Metrics', type: 'challenge' },
        { title: 'Bestseller Comparison', type: 'challenge' },
        { title: 'Author Category Sales', type: 'challenge' },
        { title: 'Top Authors', type: 'challenge' },
        { title: 'Price Tier Rankings', type: 'challenge' },
        { title: 'Month-over-Month Sales', type: 'challenge' },
        { title: 'Price Range Analysis', type: 'challenge' },
      ],
    },
  ];

  return (
    <div className="relative flex flex-grow flex-col items-center bg-gradient-to-b from-zinc-900 to-zinc-950 px-4 pb-52 pt-3 text-zinc-400 md:px-10 md:pt-8">
      <div className="flex w-full items-center justify-between">
        <a
          href="https://roadmap.sh"
          target="_blank"
          className="opacity-20 transition-opacity hover:opacity-100"
        >
          <RoadmapLogoIcon />
        </a>
        <AccountButton />
      </div>
      <div className="relative mt-7 max-w-3xl text-left md:mt-20 md:text-center">
        <Spotlight className="left-[-170px] top-[-200px]" fill="#EAB308" />
        <div className="inline-block rounded-full bg-yellow-500/10 px-4 py-1.5 text-base text-yellow-500 md:px-6 md:py-2 md:text-lg">
          <span className="hidden sm:block">
            Complete Course to Master Practical SQL
          </span>
          <span className="block sm:hidden">Complete SQL Course</span>
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:mt-8 md:text-7xl">
          Master SQL <span className="hidden min-[384px]:inline">Queries</span>
          <div className="mt-2.5 bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent md:text-6xl lg:text-7xl">
            From Basic to Advanced
          </div>
        </h1>

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

      <AuthorQuoteMessage />

      <PlatformDemo />

      <SectionHeader
        title="Not your average SQL course"
        description="Built around a text-based interactive approach and packed with practical challenges, this course stands out with features that make it truly unique."
        className="mt-16 md:mt-32"
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
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
            lifetime access
          </span>{' '}
          to the course including all the future updates. Also, there is a
          certificate of completion which you can share with your potential
          employers.
        </p>
      </div>

      <SectionHeader
        title="Course Overview"
        description="The course is designed to help you go from SQL beginner to expert
        through hands-on practice with real-world scenarios, mastering
        everything from basic to complex queries."
        className="mt-8 md:mt-24"
      />

      <div className="mt-8 w-full max-w-3xl space-y-4 md:mt-12">
        {chapters.map((chapter, index) => (
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
              experience in the tech industry. Throughout my career I have built
              and scaled software systems, architected complex data systems, and
              worked with large amounts of data to create efficient solutions.
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
              understand and apply. Whether you are just starting or looking to
              sharpen your skills, you are in the right place.
            </p>
          </div>
        }
      />

      <CourseAuthor />

      <FAQSection />

      <FloatingPurchase />
    </div>
  );
}
