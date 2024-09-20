import slugify from 'slugify';
import { getAllAuthors, type AuthorFileType } from './author.ts';
import { getCollection, type CollectionEntry } from 'astro:content';

type RawQuestionGroupFileType = CollectionEntry<'question-groups'>;

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
  author?: AuthorFileType;
};

/**
 * Gets all the best practice files
 *
 * @returns Promisified BestPracticeFileType[]
 */
export async function getAllQuestionGroups(): Promise<QuestionGroupType[]> {
  const questionGroupEntries = await getCollection('question-groups');
  const allAuthors = await getAllAuthors();
  const answerFilesMap = import.meta.glob(
    // get the files inside /src/data/question-groups/[ignore]/content/*.md
    `/src/data/question-groups/*/content/*.md`,
    {
      eager: true,
      query: '?raw',
    },
  );

  return questionGroupEntries
    .map((questionGroupEntry) => {
      const formattedAnswers: QuestionType[] =
        questionGroupEntry.data.questions.map((qa) => {
          const questionText = qa.question;
          let answerText = qa.answer;
          let isLongAnswer = false;

          if (answerText.endsWith('.md')) {
            const answerFilePath = `/src/data/question-groups/${questionGroupEntry.slug}/content/${answerText}`;
            answerText =
              // @ts-ignore
              answerFilesMap[answerFilePath]?.default ||
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

      const author = allAuthors.find(
        (author) => author.slug === questionGroupEntry.data.authorId,
      );

      return {
        ...questionGroupEntry,
        questions: formattedAnswers,
        allTopics: uniqueTopics,
        author,
      };
    })
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getQuestionGroupById(slug: string) {
  const questionGroups = await getAllQuestionGroups();

  return questionGroups.find((group) => group.slug === slug);
}

export async function getQuestionGroupsByIds(
  ids: string[],
): Promise<{ id: string; title: string; description: string }[]> {
  if (!ids?.length) {
    return [];
  }

  const questionGroups = await getAllQuestionGroups();
  return questionGroups
    .filter((group) => ids.includes(group.slug))
    .map((group) => {
      return {
        id: group.id,
        title: group.data.title,
        description: `${group.questions.length} Questions`,
      };
    });
}
