import React from 'react';
import DefaultLayout from '../default';
import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';

class GuideLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <DefaultLayout>
        <PageHeader />
        <div className="container">
          { children }
        </div>
        <PageFooter />
      </DefaultLayout>
    );
  }
}

export default GuideLayout;