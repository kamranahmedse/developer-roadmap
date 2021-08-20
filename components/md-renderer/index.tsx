import React from 'react';
// @ts-ignore
import { MDXProvider } from '@mdx-js/react';
import MdxComponents from './mdx-components';

type MdRendererType = {
  children: React.ReactNode
};

export default function MdRenderer(props: MdRendererType) {
  return (
    <MDXProvider components={MdxComponents}>
      {props.children}
    </MDXProvider>
  );
};
