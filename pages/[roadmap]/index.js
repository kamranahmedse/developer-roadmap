import Error from 'next/error';
import DefaultLayout from 'layouts/default';
import SiteNav from 'components/site-nav';
import PageFooter from 'components/page-footer';
import RoadmapSummary from 'components/roadmap-summary';
import { serverOnlyProps } from 'lib/server';
import { getRequestedRoadmap } from 'lib/roadmap';
import Helmet from 'components/helmet';
import PageHeader from 'components/page-header';
import GuideBody from 'components/guide-body';

import { BadgesList, PrimaryBadge, SecondaryBadge } from 'components/badges';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Roadmap = ({ roadmap }) => {
  if (!roadmap) {
    return <Error statusCode={ 404 } />
  }

  if (false && roadmap.upcoming) {
    const GuideContent = require(`../../data/roadmaps/upcoming.md`).default;

    return (
      <DefaultLayout>
        <Helmet title={ roadmap.title } description={ roadmap.description } />
        <SiteNav />
          <PageHeader
            title={ roadmap.title}
            subtitle={roadmap.description}>
            <BadgesList className="mt-4">
              <SecondaryBadge>Upcoming Roadmap</SecondaryBadge>
              <a href="/signup">
                <PrimaryBadge>
                  <FontAwesomeIcon icon={faEnvelope}/>
                  Notify Me
                </PrimaryBadge>
              </a>
            </BadgesList>
          </PageHeader>
          <div className="border-top pt-5">
            <GuideBody >
              <GuideContent />
            </GuideBody>
          </div>
        <PageFooter />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Helmet title={ roadmap.title } description={ roadmap.description } />
      <SiteNav />
      <RoadmapSummary roadmap={ roadmap } />
      <PageFooter />
    </DefaultLayout>
  );
};

Roadmap.getInitialProps = serverOnlyProps(({ req }) => {
  return {
    roadmap: getRequestedRoadmap(req),
  };
});

export default Roadmap;
