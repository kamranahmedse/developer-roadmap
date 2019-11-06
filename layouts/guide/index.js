import React from 'react';
import DefaultLayout from 'layouts/default';
import PageHeader from 'components/page-header';
import PageFooter from 'components/page-footer';

class GuideLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <DefaultLayout>
        <PageHeader />
        { children }
        <PageFooter />
      </DefaultLayout>
    );
  }
}

export default GuideLayout;
