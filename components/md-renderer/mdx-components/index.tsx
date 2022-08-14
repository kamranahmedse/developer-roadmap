import { Code } from '@chakra-ui/react';
import { P } from './p';
import Headings from './heading';
import { Pre } from './pre';
import BlockQuote from './blockquote';
import { Table } from './table';
import IFrame from './iframe';
import { Img } from './img';
import EnrichedLink from './a';
import { BadgeLink } from './badge-link';
import { Li, Ul } from './ul';
import PremiumBlock from './premium-block';
import { ResourceGroupTitle } from './resource-group-title';
import { DedicatedRoadmap } from './dedicated-roadmap';

const MdxComponents = {
  p: P,
  ...Headings,
  pre: Pre,
  blockquote: BlockQuote,
  a: EnrichedLink,
  DedicatedRoadmap,
  table: Table,
  iframe: IFrame,
  img: Img,
  code: Code,
  BadgeLink: BadgeLink,
  ResourceGroupTitle: ResourceGroupTitle,
  PremiumBlock: PremiumBlock,
  ul: Ul,
  li: Li
};

export default MdxComponents;
