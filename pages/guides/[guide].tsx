import { Box, Container } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { Footer } from '../../components/footer';
import { ContentPageHeader } from '../../components/content-page-header';
import MdRenderer from '../../components/md-renderer';
import { getAllGuides, getGuideById, GuideType } from '../../lib/guide';
import siteConfig from '../../content/site.json';
import Helmet from '../../components/helmet';

type GuideProps = {
  guide: GuideType;
};

export default function Guide(props: GuideProps) {
  const { guide } = props;
  const GuideContent = require(`../../content/guides/${guide.id}.md`).default;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Helmet
        title={guide.title}
        description={guide.description}
      />
      <Box mb='60px'>
        <ContentPageHeader
          title={guide.title}
          subtitle={guide.description}
          formattedDate={guide.formattedUpdatedAt!}
          author={{
            twitter: guide?.author?.twitter!,
            picture: guide?.author?.picture!,
            name: guide?.author?.name!
          }}
          subLink={{
            text: 'Improve this Guide',
            url: `${siteConfig.url.repo}/tree/master/content/guides/${guide.id}.md`
          }}
        />
        <Container maxW={'container.md'} position='relative'>
          <MdRenderer>
            <GuideContent />
          </MdRenderer>
        </Container>
      </Box>

      <OpensourceBanner />
      <Footer />
    </Box>
  );
}

type StaticPathItem = {
  params: {
    guide: string
  }
};

export async function getStaticPaths() {
  const guides = getAllGuides();
  const paramsList: StaticPathItem[] = guides.map(guide => ({
    params: { 'guide': guide.id }
  }));

  return {
    paths: paramsList,
    fallback: false
  };
}

type ContextType = {
  params: {
    guide: string
  }
};

export async function getStaticProps(context: ContextType) {
  const guideId: string = context?.params?.guide;

  return {
    props: {
      guide: getGuideById(guideId)
    }
  };
}
