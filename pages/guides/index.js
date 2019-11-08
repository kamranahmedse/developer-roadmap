import DefaultLayout from 'layouts/default/index';
import SiteNav from 'components/site-nav';
import PageHeader from 'components/page-header';
import PageFooter from 'components/page-footer';
import { getAllGuides } from 'lib/guide';
import FeaturedGuide from '../../components/featured-guide';

const Roadmap = () => (
  <DefaultLayout>
    <SiteNav />
    <PageHeader
      title="Programming Guides"
      subtitle="Easy to follow guides on complex topics written and maintained by the community"
    />
    <div className="pt-5 pb-5 bg-light border-top">
      <div className="container">
        <div className="row">
          { getAllGuides().map(guide => (
            <FeaturedGuide guide={guide} key={ guide.url } />
          )) }
        </div>
      </div>
    </div>
    <PageFooter />
  </DefaultLayout>
);

export default Roadmap;
