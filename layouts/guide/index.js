import React from 'react';
import DefaultLayout from 'layouts/default';
import TopNav from 'components/top-nav';
import PageFooter from 'components/page-footer';

class GuideLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <DefaultLayout>
        <TopNav />
        { children }
        <PageFooter />
      </DefaultLayout>
    );
  }
}

export default GuideLayout;
