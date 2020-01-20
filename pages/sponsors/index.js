import Helmet from 'components/helmet';
import SiteNav from 'components/site-nav';
import PageFooter from 'components/page-footer';
import DefaultLayout from 'layouts/default/index';
import { HeaderWrap, Logo, Subtitle, Title } from 'components/page-logo-header/style';
import { Mark } from 'components/mark';
import { StrongLink } from 'components/link';

const PageTitle = 'Advertise with Us';
const PageDescription = 'Place your ad in front of 200,000 developers';

const Sponsors = () => (
  <DefaultLayout>
    <Helmet title={PageTitle} desciption={PageDescription} />
    <SiteNav />
    <HeaderWrap>
      <Logo src='/brand.png' alt='' />
      <Title>Sponsor Us</Title>
      <Subtitle>Help us build and place your ad in front of <Mark>300,000</Mark> developers</Subtitle>
    </HeaderWrap>

    <div className='pt-5 pb-5 border-top'>
      <div className='container' style={{ maxWidth: '680px' }}>
        <div className='row'>
          <div className='col'>
            <p>roadmap.sh and <StrongLink href='https://github.com/kamranahmedse/developer-roadmap' target='_blank'>developer-roadmap</StrongLink> are the #1 place for developers to get the idea about the tech landscape, find out the what they are missing, get the ideas about how and what to learn and stay up to date.</p>

            <p>The roadmap.sh audience consists of over <strong>300,000</strong> developers who visit the site an average of <strong>150,000</strong> times per month. They're developers of all seniority levels and domains including frontend, backend, fullstack, web and mobile, engineering managers, product managers and CTOs.</p>

            <p className='mb-5 pb-1'>Email <StrongLink href='mailto:kamran@roadmap.sh?subject=Sponsoring Roadmap.sh'>kamran@roadmap.sh</StrongLink> to get in touch about connecting with your potential customers!</p>

            <p>Depending on your product or service, your budget, and your goals, there are several options to choose from when advertising on roadmap.sh and <StrongLink href='https://github.com/kamranahmedse/developer-roadmap' target='_blank'>developer-roadmap</StrongLink></p>

            <h2><StrongLink href='mailto:kamran@roadmap.sh?subject=Sponsoring Roadmap.sh'>Newsletter Promo</StrongLink></h2>
            <p>Drive a quick burst of traffic</p>
            <ul>
              <li>Appear in the monthly email newsletter delivered to <strong>13000+</strong> subscribers.</li>
              <li>Costs <Mark>$200 per email</Mark></li>
              <li>Appears as a link with 2 lines of supporting text beneath.</li>
            </ul>

            <h2><StrongLink href='mailto:kamran@roadmap.sh?subject=Sponsoring Roadmap.sh'>Everywhere Package</StrongLink></h2>
            <p>Higher traffic and get in front of more eyes</p>
            <ul>
              <li>Shown as a bold sticky banner on the top of the website on all the pages.</li>
              <li>You will be mentioned and thanked in the monthly newsletter sent to 13000+ subscribers.</li>
              <li>Your will be added as a sponsor to the footer of <StrongLink href="https://github.com/kamranahmedse/developer-roadmap" target="_blank">GitHub Project</StrongLink></li>
              <li>Costs <Mark>500$ per week</Mark></li>
              <li>On website there are <strong>2000 unique sessions daily</strong> on average. An average user spends around 3 minutes on the website after landing and the bounce rate is pretty low (2.76% at the moment) so it is a great option to get your product in front of more and more eyes.</li>
              <li><StrongLink href="https://github.com/kamranahmedse/developer-roadmap" target="_blank">Github repository</StrongLink> gets around <strong>5000 visits</strong> per day</li>
            </ul>

            <h2><StrongLink href='mailto:kamran@roadmap.sh?subject=Sponsoring Roadmap.sh'>Partner Package</StrongLink></h2>
            <p>High continuous traffic for a month</p>
            <ul>
              <li>Sponsor reference will be added to the roadmap images and PDFs for the sponsorship period. It will stay with people who download/print them for that period</li>
              <li>You will be added as a sponsor to the header of <StrongLink href="https://github.com/kamranahmedse/developer-roadmap">the repository</StrongLink></li>
              <li>You will be mentioned in the monthly email sent to <strong>13000+ subscribers</strong></li>
              <li>A banner will be added to the top of the website</li>
              <li>Costs <Mark>4000$ per month</Mark></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <PageFooter />
  </DefaultLayout>
);

export default Sponsors;
