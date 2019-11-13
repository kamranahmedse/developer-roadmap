import { faCodeBranch, faEnvelope } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BadgeLink, BadgesList, PrimaryBadge, SecondaryBadge } from 'components/badges';
import FeaturedGuide from 'components/featured-guide';
import DefaultLayout from 'layouts/default/index';
import PageHeader from 'components/page-header';
import PageFooter from 'components/page-footer';
import SiteNav from 'components/site-nav';
import { getAllGuides } from 'lib/guide';
import siteConfig from 'storage/site';

const Roadmap = () => (
  <DefaultLayout>
    <SiteNav />
    <PageHeader
      title="Programming Guides"
      subtitle="Easy to follow guides on complex topics written and maintained by the community">
      <BadgesList className="mt-4">
        <BadgeLink href={siteConfig.url.addGuide} target="_blank">
          <SecondaryBadge>
            <FontAwesomeIcon icon={faCodeBranch}/>
            Write a Guide
          </SecondaryBadge>
        </BadgeLink>
        <BadgeLink href="/signup">
          <PrimaryBadge>
            <FontAwesomeIcon icon={faEnvelope}/>
            Send me Updates
          </PrimaryBadge>
        </BadgeLink>
      </BadgesList>
    </PageHeader>
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
