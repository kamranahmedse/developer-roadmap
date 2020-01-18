import MdRenderer from 'components/md-renderer'
import SharePage from 'components/share-page';
import { GuideBodyWrap } from './style';

const GuideBody = ({ guide }) => {
  const GuideContent = require(`../../content/guides/${guide.fileName}.md`).default;
  return (
    <GuideBodyWrap>
      <MdRenderer>
        <GuideContent />
        {
          guide.author && <SharePage
            title={ guide.title }
            url={ guide.url }
            twitterUsername={ guide.author.twitter }
          />
        }
      </MdRenderer>
    </GuideBodyWrap>
  );
};

export default GuideBody;
