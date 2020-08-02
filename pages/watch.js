import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultLayout from 'layouts/default/index';
import SiteNav from 'components/site-nav';
import PageFooter from 'components/page-footer';
import PageHeader from 'components/page-header';
import RowBlock from 'components/row-block';
import { BadgeLink, BadgesList, PrimaryBadge, SecondaryBadge } from 'components/badges';
import Helmet from 'components/helmet';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';


const WatchList = () => (
  <DefaultLayout>
    <Helmet title='Watch' desciption='List of videos published on our youtube channel so far' />
    <SiteNav />
    <div className='container'>
      <PageHeader
        title={'Watch'}
        subtitle={'List of videos published on our youtube channel so far'}>
        <BadgesList className='mt-4'>
          <BadgeLink href='https://www.youtube.com/channel/UCA0H2KIWgWTwpTFjSxp0now?sub_confirmation=1' target='_blank'>
            <SecondaryBadge>
              <FontAwesomeIcon icon={faYoutube} />
              YouTube Channel
            </SecondaryBadge>
          </BadgeLink>
          <BadgeLink href='/signup'>
            <PrimaryBadge>
              <FontAwesomeIcon icon={faEnvelope} />
              Send me Updates
            </PrimaryBadge>
          </BadgeLink>
        </BadgesList>
      </PageHeader>
    </div>
    <div className='pt-5 pb-5 bg-light border-top'>
      <div className='container'>
        <div className='row'>
          <RowBlock
            openExternal
            title={'JavaScript Fetch API'}
            subtitle="Learn how to make API calls with vanilla JavaScript using browser's builtin Fetch API."
            url='https://www.youtube.com/watch?v=-ZI0ea5O2oA'
          />
          <RowBlock
            openExternal
            title={'Scaling an Application'}
            subtitle='Learn how to scale an unscalable application and how to tackle the issues in production.'
            url='https://www.youtube.com/watch?v=a2rcgzludDU'
          />
          <RowBlock
            openExternal
            title={'All about Promises in JavaScript'}
            subtitle='Everything you need to know to about writing asynchronous code with Promises.'
            url='https://www.youtube.com/watch?v=BvrkobaCVVE'
          />
          <RowBlock
            openExternal
            title={'GitHub Actions'}
            subtitle='Learn what is CI/CD and how to automate your workflows with GitHub actions.'
            url='https://www.youtube.com/watch?v=nyKZTKQS_EQ'
          />
          <RowBlock
            openExternal
            title={'Dependency Injection'}
            subtitle='Learn how to write testable and maintainable code with Dependency Injection.'
            url='https://www.youtube.com/watch?v=0yc2UANSDiw'
          />
          <RowBlock
            openExternal
            title={'CSS Variables'}
            subtitle='Learn how to write maintainable CSS using CSS Variables with a simple project based lesson.'
            url='https://www.youtube.com/watch?v=lgaxU7CRmxU'
          />
          <RowBlock
            openExternal
            title={'All about DOM'}
            subtitle='Learn and understand the differences between the DOM, Shadow DOM and the Virtual DOM.'
            url='https://www.youtube.com/watch?v=7Tok22qxPzQ'
          />
          <RowBlock
            openExternal
            title={'Creating a React App'}
            subtitle='Learn how to build a react application with this project based video series.'
            url='https://www.youtube.com/watch?v=NyG7YJWJd6s&list=PLkZYeFmDuaN3NDLnBG01-sH2-nwn43mYu'
          />
          <RowBlock
            openExternal
            title={'Arrays and Objects in JavaScript'}
            subtitle='Learn how to manipulate arrays and objects in JavaScript with built-in JavaScript methods.'
            url='https://www.youtube.com/watch?v=n3NKGsM3iEw'
          />
        </div>
      </div>
    </div>
    <PageFooter />
  </DefaultLayout>
);

export default WatchList;
