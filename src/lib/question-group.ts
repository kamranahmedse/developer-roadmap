import type { MarkdownFileType } from './file';
import slugify from 'slugify';
import { getAllAuthors } from './author.ts';

interface RawQuestionGroupFrontmatter {
  order: number;
  briefTitle: string;
  briefDescription: string;
  title: string;
  description: string;
  isNew: boolean;
  authorId?: string;
  date?: string;
  seo: {
    title: string;
    description: string;
    ogImageUrl?: string;
    keywords: string[];
  };
  relatedTitle?: string;
  relatedGuides?: Record<string, string>;
  sitemap: {
    priority: number;
    changefreq: string;
  };
  questions: {
    question: string;
    answer: string;
    topics: string[];
  }[];
}

type RawQuestionGroupFileType =
  MarkdownFileType<RawQuestionGroupFrontmatter> & {
    id: string;
  };

export type QuestionType = {
  id: string;
  question: string;
  answer: string;
  isLongAnswer: boolean;
  topics?: string[];
};

export type QuestionGroupType = RawQuestionGroupFileType & {
  questions: QuestionType[];
  allTopics: string[];
};

/**
 * Gets all the best practice files
 *
 * @returns Promisified BestPracticeFileType[]
 */
export async function getAllQuestionGroups(): Promise<QuestionGroupType[]> {
  const questionGroupFilesMap = import.meta.glob<RawQuestionGroupFileType>(
    `/src/data/question-groups/*/*.md`,
    {
      eager: true,
    },
  );

  const answerFilesMap = import.meta.glob<string>(
    // get the files inside /src/data/question-groups/[ignore]/content/*.md
    `/src/data/question-groups/*/content/*.md`,
    {
      eager: true,
      query: '?raw',
    },
  );

  const allAuthors = await getAllAuthors();

  return Object.values(questionGroupFilesMap)
    .map((questionGroupFile) => {
      const fileParts = questionGroupFile?.file?.split('/');
      const [questionGroupDir, questionGroupFileName] = fileParts?.slice(-2);

      const questionGroupFileId = questionGroupFileName?.replace('.md', '');
      const formattedAnswers: QuestionType[] =
        questionGroupFile.frontmatter.questions.map((qa) => {
          const questionText = qa.question;
          let answerText = qa.answer;
          let isLongAnswer = false;

          if (answerText.endsWith('.md')) {
            const answerFilePath = `/src/data/question-groups/${questionGroupDir}/content/${answerText}`;
            answerText =
              (answerFilesMap[answerFilePath] as any)?.default ||
              answerFilesMap[answerFilePath] ||
              `File missing: ${answerFilePath}`;

            isLongAnswer = true;
          }

          return {
            id: slugify(questionText, { lower: true }),
            question: questionText,
            answer: answerText,
            topics: qa.topics,
            isLongAnswer,
          };
        });

      const uniqueTopics = formattedAnswers
        .flatMap((answer) => answer.topics || [])
        .filter((topic) => topic)
        .reduce((acc, topic) => {
          if (!acc.includes(topic)) {
            acc.push(topic);
          }

          return acc;
        }, [] as string[]);

      return {
        ...questionGroupFile,
        id: questionGroupFileId,
        questions: formattedAnswers,
        allTopics: uniqueTopics,
        author: allAuthors.find(
          (author) => author.id === questionGroupFile.frontmatter.authorId,
        )!,
      };
    })
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export async function getQuestionGroupById(id: string) {
  const questionGroups = await getAllQuestionGroups();

  return questionGroups.find((group) => group.id === id);
}

export async function getQuestionGroupsByIds(
  ids: string[],
): Promise<{ id: string; title: string; description: string }[]> {
  if (!ids?.length) {
    return [];
  }

  const questionGroupFilesMap = import.meta.glob<
    MarkdownFileType<RawQuestionGroupFrontmatter>
  >(`/src/data/question-groups/*/*.md`, {
    eager: true,
  });

  return Object.values(questionGroupFilesMap)
    .map((group) => {
      const fileId = group?.file?.split('/')?.pop()?.replace('.md', '');
      const frontmatter = group.frontmatter;

      return {
        id: fileId!,
        title: frontmatter.briefTitle,
        description: `${frontmatter.questions.length} Questions`,
      };
    })
    .filter((group) => {
      return ids.includes(group.id);
    });
}
