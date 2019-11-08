import React from 'react';
import DefaultLayout from 'layouts/default';
import SiteNav from 'components/site-nav';
import PageFooter from 'components/page-footer';

class GuideLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <DefaultLayout>
        <SiteNav />
        { children }
        <PageFooter />
      </DefaultLayout>
    );
  }
}

export default GuideLayout;
