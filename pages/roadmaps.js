import { faPlus } from '@fortawesome/free-solid-svg-icons';

import DefaultLayout from 'layouts/default/index';
import SiteNav from 'components/site-nav';
import PageFooter from 'components/page-footer';
import PageHeader from 'components/page-header';
import roadmaps from "data/roadmaps";
import RowBlock from 'components/row-block';
import IconRowBlock from 'components/icon-row-block';
import siteConfig from "data/site";

const RoadmapsList = () => (
  <DefaultLayout>
    <SiteNav />
    <div className="container">
      <PageHeader
        title="Developer Roadmaps"
        subtitle="Step by step guides and paths to learn different tools or technologies"
      />
    </div>
    <div className="pt-5 pb-5 bg-light border-top">
      <div className="container">
        <div className="row">
          { roadmaps.map(roadmap => (
            <RowBlock
              key={ roadmap.url }
              title={ roadmap.title.replace(/roadmap|developer/i, '') }
              subtitle={ roadmap.featuredDescription || roadmap.description }
              url={ roadmap.url }
              disabled={ roadmap.upcoming }
              badge={ roadmap.upcoming ? 'upcoming' : '' }
            />
          )) }

          <IconRowBlock
            url={ siteConfig.url.addRoadmap }
            icon={ faPlus }
            openExternal={true}
            text="Submit a Roadmap"
          />
        </div>
      </div>
    </div>
    <PageFooter />
  </DefaultLayout>
);

export default RoadmapsList;
