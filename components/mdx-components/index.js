import P from './p';
import { Headings } from './heading';
import { Pre } from './pre';
import { BlockQuote } from './blockquote';

const MdxComponents = {
  p: P,
  ...Headings,
  pre: Pre,
  blockquote: BlockQuote,
};

export default MdxComponents;