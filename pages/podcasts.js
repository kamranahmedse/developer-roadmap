import { faCodeBranch, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultLayout from 'layouts/default/index';
import SiteNav from 'components/site-nav';
import PageFooter from 'components/page-footer';
import PageHeader from 'components/page-header';
import RowBlock from 'components/row-block';
import siteConfig from 'content/site';
import { BadgeLink, BadgesList, PrimaryBadge, SecondaryBadge } from 'components/badges';
import Helmet from 'components/helmet';


const PodcastsList = () => (
  <DefaultLayout>
    <Helmet title='Podcasts' desciption='Community curated list of podcasts for developers' />
    <SiteNav />
    <div className="container">
      <PageHeader
        title={'Podcasts'}
        subtitle={'Community curated list of podcasts for developers'}>
        <BadgesList className="mt-4">
          <BadgeLink href={siteConfig.url.issue} target="_blank">
            <SecondaryBadge>
              <FontAwesomeIcon icon={faCodeBranch}/>
              Submit a Podcast
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
    </div>
    <div className="pt-5 pb-5 bg-light border-top">
      <div className="container">
        <div className="row">
            <RowBlock
              openExternal
              title={ 'Developer Tea' }
              subtitle='A podcast for developers designed to fit inside your tea break. Length ~20 min.'
              url='https://developertea.simplecast.com/'
            />
            <RowBlock
              openExternal
              title={ 'Does Not Compute' }
              subtitle='A weekly chat about the lives and workflows of modern web developers. Length ~30 mins'
              url='https://dnc.show/'
            />
            <RowBlock
              openExternal
              title={ 'HTTP 203' }
              subtitle='Podcast by Google Chrome dev advocates covering all things web. Length ~50 mins'
              url='https://developers.google.com/web/shows/http203/podcast/'
            />
            <RowBlock
              openExternal
              title={ 'The Laracasts Snippet' }
              subtitle='Short but interesting podcasts on web development aspects. Length ~10 mins'
              url='https://laracasts.com/podcast'
            />
            <RowBlock
              openExternal
              title={ 'InfoQ Podcast' }
              subtitle='Technical topics, interviews with CTOs, engineers and tech leaders. Length ~30 mins'
              url='https://www.infoq.com/the-infoq-podcast'
            />
            <RowBlock
              openExternal
              title={ 'Software Engineering Daily' }
              subtitle='Interviews and discussions about general software topics. Length ~55 mins'
              url='https://softwareengineeringdaily.com/category/all-episodes/exclusive-content/Podcast/'
            />
            <RowBlock
              openExternal
              title={ 'JS Party by Changelog' }
              subtitle='A weekly podcast by the changelog on JavaScript and the web. Length ~55 mins'
              url='https://changelog.com/jsparty'
            />
            <RowBlock
              openExternal
              title={ 'Full Stack Radio' }
              subtitle='Interviews and discussions about everything related to development. ~55 mins'
              url='http://www.fullstackradio.com/'
            />
            <RowBlock
              openExternal
              title={ 'Software Engineering Radio' }
              subtitle='Talks from professional engineers about a variety of technical topics. Length ~60 mins'
              url='http://www.se-radio.net/'
            />
            <RowBlock
              openExternal
              title={ 'The React Podcast' }
              subtitle='Weekly interviews and updates about React hosted by Michael Jackson. Length ~40 minutes'
              url='https://reactpodcast.simplecast.fm/'
            />
            <RowBlock
              openExternal
              title={ 'The Changelog' }
              subtitle='Conversations with the hackers, leaders, and innovators of software development. ~60 mins'
              url='https://changelog.com/podcast'
            />
            <RowBlock
              openExternal
              title={ 'The Indie Hackers Podcast' }
              subtitle='Raw conversations with the founders behind profitable online businesses. ~60 mins'
              url='https://www.indiehackers.com/podcast'
            />
            <RowBlock
              openExternal
              title={ 'Masters of Scale' }
              subtitle='Podcast by Reid Hoffman about how companies grow from zero to a gazillion. ~40 mins'
              url='https://mastersofscale.com/'
            />
            <RowBlock
              openExternal
              title={ 'Framework' }
              subtitle='Process of researching, planning and product development. ~50 mins'
              url='https://podcasts.apple.com/us/podcast/framework/id1373741352'
            />
        </div>
      </div>
    </div>
    <PageFooter />
  </DefaultLayout>
);

export default PodcastsList;
