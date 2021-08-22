import P from './p';
import Headings from './heading';
import { Pre } from './pre';
import BlockQuote from './blockquote';
import { Table } from './table';
import IFrame from './iframe';
import { Img } from './img';
import EnrichedLink from './a';
import { BadgeLink } from './badge-link';
import Ul from './ul';
import Li from './li';

const MdxComponents = {
  p: P,
  ...Headings,
  pre: Pre,
  blockquote: BlockQuote,
  a: EnrichedLink,
  table: Table,
  iframe: IFrame,
  img: Img,
  BadgeLink: BadgeLink,
  ul: Ul,
  li: Li
};

export default MdxComponents;
