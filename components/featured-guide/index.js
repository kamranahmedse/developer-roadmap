import Link from 'next/link';
import formatDate from 'date-fns/format'

import { Author, AuthorImage, AuthorName, BlockLink, BlockMeta, BlockSubtitle, BlockTitle, PublishDate } from './style';
import { findByUsername } from 'lib/author';

const FeaturedGuide = ({ guide }) => {
  const author = findByUsername(guide.author) || {};
  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container">
      <Link href={ guide.url } passHref>
        <BlockLink>
          <BlockTitle>{ guide.title }</BlockTitle>
          <BlockSubtitle>{ guide.featuredDescription || guide.description }</BlockSubtitle>
          <BlockMeta>
            <Author>
              <AuthorImage src={ author.picture } />
              <AuthorName>{ author.name }</AuthorName>
            </Author>
            <PublishDate>{ formatDate(new Date(guide.createdAt), 'MMMM d, yyyy') }</PublishDate>
          </BlockMeta>
        </BlockLink>
      </Link>
    </div>
  )
};

export default FeaturedGuide;
