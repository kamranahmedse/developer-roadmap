import type { OfficialGuideDocument } from '../../queries/official-guide';
import { GuideListItem } from './GuideListItem';

export interface FeaturedGuidesProps {
  heading: string;
  guides: OfficialGuideDocument[];
  questions: OfficialGuideDocument[];
}

export function FeaturedGuideList(props: FeaturedGuidesProps) {
  const { heading, guides, questions = [] } = props;

  const sortedGuides = [...guides, ...questions].sort((a, b) => {
    const aDate = new Date(a.publishedAt ?? new Date());
    const bDate = new Date(b.publishedAt ?? new Date());

    return bDate.getTime() - aDate.getTime();
  });

  return (
    <div className="container">
      <h2 className="block text-2xl font-bold sm:text-3xl">{heading}</h2>

      <div className="mt-3 sm:my-5">
        {sortedGuides.map((guide) => (
          <GuideListItem key={guide._id} guide={guide} />
        ))}
      </div>

      <a
        href="/guides"
        className="hidden rounded-full bg-linear-to-r from-slate-600 to-black px-3 py-2 text-xs font-medium text-white transition-colors hover:from-blue-600 hover:to-blue-800 sm:inline"
      >
        View All Guides &rarr;
      </a>

      <div className="mt-3 block sm:hidden">
        <a
          href="/guides"
          className="font-regular block rounded-md border border-black p-2 text-center text-sm text-black hover:bg-black hover:text-gray-50"
        >
          View All Guides &nbsp;&rarr;
        </a>
      </div>
    </div>
  );
}
