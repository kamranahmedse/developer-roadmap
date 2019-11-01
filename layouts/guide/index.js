import React from 'react';
import { MDXProvider } from '@mdx-js/react'
import DefaultLayout from '../default';
import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';

class GuideLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <MDXProvider>
        <DefaultLayout>
          <PageHeader />
          { children }
          <PageFooter />
        </DefaultLayout>
      </MDXProvider>
    );
  }
}

export default GuideLayout;