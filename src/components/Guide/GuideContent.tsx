import { cn } from '../../lib/classname';
import { guideRenderer } from '../../lib/guide-renderer';
import type { OfficialGuideResponse } from '../../queries/official-guide';
import { TableOfContent } from '../TableOfContent/TableOfContent';
import { RelatedGuides } from './RelatedGuides';

type GuideContentProps = {
  guide: OfficialGuideResponse;
};

export function GuideContent(props: GuideContentProps) {
  const { guide } = props;
  const content = guideRenderer.render(guide.content);
  const tableOfContents = guideRenderer.tableOfContents(guide.content);
  const showTableOfContent = tableOfContents.length > 0;
  const hasRelatedGuides =
    guide.relatedGuides && guide.relatedGuides.length > 0;

  return (
    <article className="lg:grid lg:max-w-full lg:grid-cols-[1fr_minmax(0,700px)_1fr]">
      {(showTableOfContent || hasRelatedGuides) && (
        <div className="sticky top-[36px] bg-linear-to-r from-gray-50 py-0 lg:relative lg:col-start-3 lg:col-end-4 lg:row-start-1">
          {hasRelatedGuides && (
            <RelatedGuides relatedGuides={guide?.relatedGuides || []} />
          )}

          {showTableOfContent && <TableOfContent toc={tableOfContents} />}
        </div>
      )}

      <div
        className={cn(
          'col-start-2 col-end-3 row-start-1 mx-auto max-w-[700px] py-5 sm:py-10',
          showTableOfContent && 'lg:border-r',
        )}
      >
        <div className="prose prose-xl prose-h2:mb-3 prose-h2:mt-10 prose-h2:scroll-mt-5 prose-h2:text-balance prose-h2:text-3xl prose-h3:mt-2 prose-h4:text-2xl prose-h3:scroll-mt-5 prose-h3:text-balance prose-h4:text-balance prose-h5:text-balance prose-h5:font-medium prose-blockquote:font-normal prose-code:bg-transparent prose-img:mt-1 sm:prose-h2:scroll-mt-10 sm:prose-h3:scroll-mt-10 prose-li:[&>p]:m-0 container">
          <h1 className="mb-3 text-4xl font-bold text-balance">
            {guide.title}
          </h1>
          <p className="my-0 mb-6 flex items-center justify-start text-sm text-gray-400">
            <a
              href={`/authors/${guide.author?.slug}`}
              className="inline-flex items-center font-medium underline-offset-2 hover:text-gray-600 hover:underline"
            >
              <img
                alt={guide.author?.name}
                src={guide.author?.avatar}
                className="mr-2 mb-0 inline h-5 w-5 rounded-full"
              />
              {guide.author?.name}
            </a>
          </p>

          {content}
        </div>
      </div>
    </article>
  );
}
