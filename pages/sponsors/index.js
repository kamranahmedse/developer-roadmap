import Helmet from 'components/helmet';
import SiteNav from 'components/site-nav';
import PageFooter from 'components/page-footer';
import DefaultLayout from 'layouts/default/index';
import PageLogoHeader from 'components/page-logo-header';

const PageTitle = 'Advertise with Us';
const PageDescription = 'Place your ad in front of 200,000 developers';

const Sponsors = () => (
  <DefaultLayout>
    <Helmet title={PageTitle} desciption={PageDescription} />
    <SiteNav />
    <PageLogoHeader title={PageTitle} subtitle={PageDescription} />

    <div className='pt-5 pb-5 border-top'>
      <div className='container' style={{ maxWidth: '800px' }}>
        <div className='row'>
          <div className='col'>
            <p>roadmap.sh is the <strong>#1</strong> place for developers to get the idea about the tech landscape, find out the what they are missing, get the ideas about how and what to learn and stay up to date.</p>

            <p>The roadmap.sh audience consists of over 200,000 developers who visit the site an average of 150,000 times per month. They're developers of all seniority levels and domains including frontend, backend, fullstack, web and mobile, engineering managers, product managers and CTOs.</p>

            <p>Email <a href='mailto:kamran@roadmap.sh'>kamran@roadmap.sh</a> to get in touch about connecting with your potential customers!</p>

            <p>Depending on your product or service, your budget, and your goals, there are several options to choose from when advertising on roadmap.sh and/or <a href='https://github.com/kamranahmedse/developer-roadmap' target='_blank'>github.com/kamranahmedse/developer-roadmap</a></p>
          </div>
        </div>
      </div>
    </div>
    <PageFooter />
  </DefaultLayout>
);

export default Sponsors;
