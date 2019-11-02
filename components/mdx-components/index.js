import P from './p';
import { Headings } from './heading';
import { Pre } from './pre';
import { BlockQuote } from './blockquote';
import { Table } from './table';
import { IFrame } from './iframe';
import { Img } from './img';

const MdxComponents = {
  p: P,
  ...Headings,
  pre: Pre,
  blockquote: BlockQuote,
  table: Table,
  iframe: IFrame,
  img: Img,
};

export default MdxComponents;