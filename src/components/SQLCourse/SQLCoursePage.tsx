import {
    ArrowRightIcon,
    ArrowUpDownIcon,
    BarChartIcon,
    BrainIcon,
    ClipboardIcon,
    CodeIcon,
    DatabaseIcon,
    Eye,
    FileQuestionIcon,
    GitBranchIcon,
    GitMergeIcon,
    LayersIcon,
    TableIcon,
    WrenchIcon
} from 'lucide-react';
import { ChapterRow } from './ChapterRow';
import { CourseFeature } from './CourseFeature';
import { SectionHeader } from './SectionHeader';
import { Spotlight } from './Spotlight';

type ChapterData = {
  icon: React.ReactNode;
  title: string;
  description: string;
  lessonCount: number;
  challengeCount: number;
  lessons: { title: string; type: 'lesson' | 'challenge' }[];
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
    <div className="flex flex-grow flex-col items-center bg-gradient-to-b from-zinc-900 to-zinc-950 px-4 py-16 text-zinc-400">
      <div className="relative mt-20 max-w-3xl text-center">
        <Spotlight className="left-[-170px] top-[-200px]" fill="#EAB308" />
        <div className="inline-block rounded-full bg-yellow-500/10 px-6 py-2 text-lg text-yellow-500">
          Complete Course to Master Practical SQL
        </div>

        <h1 className="mt-8 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          Master SQL Queries
          <div className="mt-2 bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
            From Basic to Advanced
          </div>
        </h1>

        <p className="mx-auto my-12 max-w-2xl text-2xl text-zinc-300">
          A structured course to master database querying - perfect for
          developers, data analysts, and anyone working with data.
        </p>

        <div className="flex flex-row items-center justify-center gap-5">
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

        <div className="mt-12">
          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-3 text-lg font-semibold text-black transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-zinc-900">
            <span className="relative flex items-center gap-2">
              Buy now for $59
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>

      <SectionHeader
        title="Not your average SQL course"
        description="Built around a text-based interactive approach and packed with practical challenges, this course stands out with features that make it truly unique."
      />

      <div className="mx-auto mt-10 w-full max-w-5xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <CourseFeature title="Textual Course" icon={Eye} description='Unlike video-based courses, where you have to learn at the pace of the instructor, this course is text-based and you can learn at your own pace.' />
          <CourseFeature title="Interactive IDE" icon={CodeIcon} description='The course is built around an interactive IDE, where you can write and run SQL queries in real-time.' />
          <CourseFeature title="Practical Challenges" icon={FileQuestionIcon} description='The course is packed with practical challenges, where you can test your knowledge and skills.' />
          <CourseFeature title="Instant Feedback" icon={ArrowRightIcon} description='The course provides instant feedback, where you can see the results of your queries immediately.' />
          <CourseFeature title="AI Instructor" icon={BrainIcon} description='There is an AI chatbot that acts as your instructor, answering questions, helping you with your queries and providing guidance.' />
          <CourseFeature title="Take Notes" icon={ClipboardIcon} description='The course allows you to take notes, where you can write down your thoughts and ideas. You can visit them later to review your progress.' />
        </div>
      </div>

      <SectionHeader
        title="Course Overview"
        description="The course is designed to help you go from SQL beginner to expert
        through hands-on practice with real-world scenarios, mastering
        everything from basic to complex queries."
      />

      <div className="my-12 w-full max-w-3xl space-y-4">
        {chapters.map((chapter, index) => (
          <ChapterRow key={index} {...chapter} />
        ))}
      </div>

      <SectionHeader
        title="Platform Features"
        description="The course is designed to help you go from SQL beginner to expert
        through hands-on practice with real-world scenarios, mastering
        everything from basic to complex queries."
      />
    </div>
  );
}
