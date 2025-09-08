import { Fragment } from 'react';
import type { JSX } from 'react/jsx-runtime';
import type { JSONContent } from '@tiptap/core';
import { slugify } from './slugger';
import {
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockItem,
} from '../components/Global/CodeBlock';
import { QuestionsList } from '../components/Questions/QuestionsList';

export type HeadingType = {
  level: number;
  text: string;
  slug: string;
};

export type HeadingGroupType = HeadingType & { children: HeadingType[] };

export type QuestionType = {
  id: string;
  question: string;
  answer: JSONContent;
  topics: string[];
};

export interface MarkType {
  [key: string]: any;
  type: string;
  attrs?: Record<string, any> | undefined;
}

export type GuideRendererOptions = {};

export class GuideRenderer {
  private marksOrder = ['underline', 'bold', 'italic', 'textStyle', 'link'];

  render(content: JSONContent) {
    const nodes = content.content || [];
    const jsxNodes = nodes
      .map((node, index) => {
        const component = this.renderNode(node);
        if (!component) {
          return null;
        }

        return <Fragment key={`${node.type}-${index}`}>{component}</Fragment>;
      })
      .filter(Boolean) as JSX.Element[];

    return jsxNodes;
  }

  tableOfContents(node: JSONContent) {
    const headlines = this.headlines(node);
    let toc: HeadingGroupType[] = [];
    let currentGroup: HeadingGroupType | null = null;

    const hasQASection = node.content?.some(
      (node) => node.type === 'qaSection',
    );

    headlines
      .filter((heading) => heading.level !== 1)
      .forEach((heading) => {
        if (heading.level === 2) {
          currentGroup = { ...heading, children: [] };
          toc.push(currentGroup);
        } else if (currentGroup && heading.level === 3) {
          currentGroup.children.push({ ...heading, text: heading.text });
        }
      });

    const qaSection = node.content?.find((node) => node.type === 'qaSection');
    if (hasQASection && qaSection) {
      toc.push({
        level: 2,
        text: 'Test yourself with Flashcards',
        slug: 'test-with-flashcards',
        children: [],
      });

      const questions = this.questions(qaSection);
      const topicsInOrder = [
        ...new Set(
          questions
            .map((question) => question.topics)
            .flat()
            .filter(Boolean),
        ),
      ];

      toc.push({
        level: 2,
        text: 'Questions List',
        slug: 'questions-list',
        children: topicsInOrder.map((topic) => {
          let topicText = topic;
          let topicSlug = slugify(topic);
          if (topic.toLowerCase() === 'beginners') {
            topicText = 'Beginner Level';
            topicSlug = 'beginner-level';
          } else if (topic.toLowerCase() === 'intermediate') {
            topicText = 'Intermediate Level';
            topicSlug = 'intermediate';
          } else if (topic.toLowerCase() === 'advanced') {
            topicText = 'Advanced Level';
            topicSlug = 'advanced';
          }

          return {
            level: 2,
            children: [],
            slug: topicSlug,
            text: topicText,
          };
        }),
      });
    }

    if (toc.length > 5) {
      toc.forEach((group) => {
        group.children = [];
      });
    }

    return toc;
  }

  headlines(node: JSONContent) {
    const nodes = node.content || [];
    const headlines: Array<HeadingType> = [];

    let hasFoundQASection = false;
    const extractHeadlines = (node: JSONContent) => {
      if (node.type === 'qaSection' || hasFoundQASection) {
        hasFoundQASection = true;
        return;
      }

      if (node.type === 'heading') {
        const text = this.getText(node);
        headlines.push({
          level: node.attrs?.level || 1,
          text,
          slug: slugify(text),
        });
      }

      if (node.content) {
        node.content.forEach((childNode) => {
          extractHeadlines(childNode);
        });
      }
    };

    nodes.forEach((childNode) => {
      extractHeadlines(childNode);
    });

    return headlines;
  }

  private getText(node: JSONContent): string {
    if (node.type === 'text') {
      return node.text || '';
    }

    if (node.content) {
      return node.content.map((childNode) => this.getText(childNode)).join('');
    }

    return '';
  }

  // `content` will call corresponding node type
  // and return text content
  private content(node: JSONContent): JSX.Element[] {
    const allNodes = node.content || [];
    return allNodes
      .map((childNode, index) => {
        const component = this.renderNode(childNode);
        if (!component) {
          return null;
        }

        return (
          <Fragment key={`${childNode.type}-${index}`}>{component}</Fragment>
        );
      })
      .filter(Boolean) as JSX.Element[];
  }

  // `renderNode` will call the method of the corresponding node type
  private renderNode(node: JSONContent): JSX.Element | null {
    const type = node.type || '';

    if (type in this) {
      // @ts-expect-error - `this` is not assignable to type 'never'
      return this[type]?.(node) as JSX.Element;
    }

    console.log(`Node type "${type}" is not supported.`);
    return null;
  }

  // `renderMark` will call the method of the corresponding mark type
  private renderMark(node: JSONContent): JSX.Element {
    // It will wrap the text with the corresponding mark type
    const text = node?.text || <>&nbsp;</>;
    let marks = node?.marks || [];
    // sort the marks by uderline, bold, italic, textStyle, link
    // so that the text will be wrapped in the correct order
    marks.sort((a, b) => {
      return this.marksOrder.indexOf(a.type) - this.marksOrder.indexOf(b.type);
    });

    return marks.reduce(
      (acc, mark) => {
        const type = mark.type;
        if (type in this) {
          // @ts-expect-error - `this` is not assignable to type 'never'
          return this[type]?.(mark, acc) as JSX.Element;
        }

        throw new Error(`Mark type "${type}" is not supported.`);
      },
      <>{text}</>,
    );
  }

  private paragraph(node: JSONContent): JSX.Element {
    const isEmpty =
      !node.content ||
      node.content?.every(
        (child) => child.type === 'text' && child.text === '',
      );
    if (isEmpty) {
      return <></>;
    }

    return <p>{this.content(node)}</p>;
  }

  private text(node: JSONContent): JSX.Element {
    if (node.marks) {
      return this.renderMark(node);
    }

    const text = node.text;
    return text ? <>{text}</> : <>&nbsp;</>;
  }

  private bold(_: MarkType, text: JSX.Element): JSX.Element {
    return <strong>{text}</strong>;
  }

  private italic(_: MarkType, text: JSX.Element): JSX.Element {
    return <em>{text}</em>;
  }

  private underline(_: MarkType, text: JSX.Element): JSX.Element {
    return <u>{text}</u>;
  }

  private strike(_: MarkType, text: JSX.Element): JSX.Element {
    return <s style={{ textDecoration: 'line-through' }}>{text}</s>;
  }

  private textStyle(mark: MarkType, text: JSX.Element): JSX.Element {
    const { attrs } = mark;
    const { color = 'inherit' } = attrs || {};

    return (
      <span
        style={{
          color,
        }}
      >
        {text}
      </span>
    );
  }

  private link(mark: MarkType, text: JSX.Element): JSX.Element {
    const { attrs } = mark;
    const { href } = attrs || {};

    const isExternal = href?.startsWith('http');
    const isRoadmapUrl = href?.startsWith('https://roadmap.sh/');

    const rel = isExternal && !isRoadmapUrl ? 'noopener noreferrer' : undefined;

    return (
      <a href={href} target="_blank" rel={rel}>
        {text}
      </a>
    );
  }

  private heading(node: JSONContent): JSX.Element {
    const { attrs } = node;
    const { level } = attrs || {};

    const text = this.getText(node);
    const slug = slugify(text);

    let Comp: keyof JSX.IntrinsicElements = 'h1';
    if (level === 2) {
      Comp = 'h2';
    } else if (level === 3) {
      Comp = 'h3';
    } else if (level === 4) {
      Comp = 'h4';
    } else if (level === 5) {
      Comp = 'h5';
    } else if (level === 6) {
      Comp = 'h6';
    }

    return <Comp id={slug}>{this.content(node)}</Comp>;
  }

  private horizontalRule(_: JSONContent): JSX.Element {
    return <hr />;
  }

  private orderedList(node: JSONContent): JSX.Element {
    return <ol>{this.content(node)}</ol>;
  }

  private bulletList(node: JSONContent): JSX.Element {
    return <ul>{this.content(node)}</ul>;
  }

  private listItem(node: JSONContent): JSX.Element {
    return <li>{this.content(node)}</li>;
  }

  private hardBreak(_: JSONContent): JSX.Element {
    return <br />;
  }

  private image(node: JSONContent): JSX.Element {
    const { attrs } = node;
    const { src, alt } = attrs || {};

    return <img alt={alt || 'Image'} src={src} />;
  }

  private code(_: MarkType, text: JSX.Element): JSX.Element {
    return <code>{text}</code>;
  }

  private codeBlock(node: JSONContent): JSX.Element {
    const code = this.getText(node);
    const language = node.attrs?.language || 'javascript';

    return (
      <div className="not-prose my-6 w-full max-w-full overflow-hidden rounded-lg border border-gray-200">
        <CodeBlockHeader language={language} code={code} />

        <CodeBlockItem key={language} value={language} lineNumbers={false}>
          <CodeBlockContent language={language}>{code}</CodeBlockContent>
        </CodeBlockItem>
      </div>
    );
  }

  private blockquote(node: JSONContent): JSX.Element {
    return <blockquote>{this.content(node)}</blockquote>;
  }

  questions(node: JSONContent) {
    const content = node.content || [];
    const questions: QuestionType[] = [];
    let currentTopic: string | null = null;
    let currentQuestion: QuestionType | null = null;

    for (const childNode of content) {
      switch (childNode.type) {
        case 'heading':
          // if level is 2, it's a topic
          if (childNode.attrs?.level === 2) {
            currentTopic = this.getText(childNode);
            // if level is 3, it's a question
          } else if (childNode.attrs?.level === 3) {
            if (currentTopic) {
              const questionText = this.getText(childNode);
              currentQuestion = {
                id: slugify(questionText),
                question: questionText,
                answer: {
                  type: 'doc',
                  content: [],
                },
                topics: [currentTopic],
              };
              questions.push(currentQuestion);
            }
          }
          break;
        // anything else is an answer
        default:
          if (!currentQuestion || !currentQuestion.answer.content) {
            console.warn('No current question found');
            continue;
          }

          currentQuestion.answer.content.push(childNode);
          break;
      }
    }

    return questions;
  }

  private qaSection(node: JSONContent): JSX.Element {
    const questions = this.questions(node);

    const questionsGroupedByTopics = questions.reduce(
      (acc, question) => {
        question.topics?.forEach((topic) => {
          acc[topic] = [...(acc[topic] || []), question];
        });
        return acc;
      },
      {} as Record<string, QuestionType[]>,
    );

    const topicsInOrder = [
      ...new Set(
        questions
          .map((question) => question.topics)
          .flat()
          .filter(Boolean),
      ),
    ];

    return (
      <>
        <h2 id="test-with-flashcards">Test yourself with Flashcards</h2>
        <p>
          You can either use these flashcards or jump to the questions list
          section below to see them in a list format.
        </p>

        <div className="mx-0 sm:-mb-32">
          <QuestionsList questions={questions} />
        </div>

        <h2 id="questions-list">Questions List</h2>
        <p>
          If you prefer to see the questions in a list format, you can find them
          below.
        </p>

        {topicsInOrder.map((questionLevel) => (
          <div className="mb-5" key={questionLevel}>
            <h3 id={slugify(questionLevel)} className="mb-0 capitalize">
              {questionLevel.toLowerCase() === 'beginners'
                ? 'Beginner Level'
                : questionLevel.toLowerCase() === 'intermediate'
                  ? 'Intermediate Level'
                  : questionLevel.toLowerCase() === 'advanced'
                    ? 'Advanced Level'
                    : questionLevel}
            </h3>
            {questionsGroupedByTopics[questionLevel].map((q) => (
              <div className="mb-5" key={q.id}>
                <h4>{q.question}</h4>
                <div>{this.render(q.answer)}</div>
              </div>
            ))}
          </div>
        ))}
      </>
    );
  }

  private table(node: JSONContent): JSX.Element {
    const content = node.content || [];
    const rows = content.filter((node) => node.type === 'tableRow');
    const firstRow = rows?.[0];
    const hasTableHead = firstRow?.content?.some(
      (node) => node.type === 'tableHeader',
    );

    const remainingRows = rows.slice(hasTableHead ? 1 : 0);

    return (
      <table className="[&_p]:m-0">
        {hasTableHead && <thead>{this.renderNode(firstRow)}</thead>}
        <tbody>
          {this.render({
            type: 'doc',
            content: remainingRows,
          })}
        </tbody>
      </table>
    );
  }

  private tableRow(node: JSONContent): JSX.Element {
    return <tr>{this.content(node)}</tr>;
  }

  private tableHeader(node: JSONContent): JSX.Element {
    return <th>{this.content(node)}</th>;
  }

  private tableCell(node: JSONContent): JSX.Element {
    return <td>{this.content(node)}</td>;
  }
}

export const guideRenderer = new GuideRenderer();
