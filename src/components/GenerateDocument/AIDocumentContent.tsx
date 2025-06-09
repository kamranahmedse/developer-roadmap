import { useEffect, useState } from 'react';
import {
  markdownToHtml,
  markdownToHtmlWithHighlighting,
} from '../../lib/markdown';
import './AIDocumentContent.css';

type AIDocumentContentProps = {
  document: string;
};

export function AIDocumentContent(props: AIDocumentContentProps) {
  const { document } = props;

  const [html, setHtml] = useState('');

  useEffect(() => {
    const html = markdownToHtmlWithHighlighting(document)
      .then((html) => {
        setHtml(html);
      })
      .catch((e) => {
        console.error(e);
        return markdownToHtml(document, false);
      });
  }, [document]);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div
        className="course-content [&>h1]:text-balance prose prose-lg prose-headings:mb-3 prose-headings:mt-8 prose-blockquote:font-normal prose-pre:rounded-2xl prose-pre:text-lg prose-li:my-1 prose-thead:border-zinc-800 prose-tr:border-zinc-800 max-lg:prose-h2:mt-3 max-lg:prose-h2:text-lg max-lg:prose-h3:text-base max-lg:prose-pre:px-3 max-lg:prose-pre:text-sm mt-8 max-w-full text-black max-lg:mt-4 max-lg:text-base"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
