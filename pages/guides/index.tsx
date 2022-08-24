import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { LinksList } from '../../components/links-list';
import { LinksListItem } from '../../components/links-list-item';
import { OpensourceBanner } from '../../components/opensource-banner';
import { Footer } from '../../components/footer';
import { GuideGridItem } from '../../components/guide/guide-grid-item';
import { PageHeader } from '../../components/page-header';
import { getAllGuides, GuideType } from '../../lib/guide';
import Helmet from '../../components/helmet';

type GuidesProps = {
  guides: GuideType[]
}

export default function Guides(props: GuidesProps) {
  const { guides = [] } = props;

  const recentGuides = guides.slice(0, 2);
  const oldGuides = guides.slice(2);

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Helmet
        title={'Visual Guides'}
        description={'Succinct graphical explanations to engineering topics.'}
      />
      <Box mb='60px'>
        <PageHeader
          title={'Visual Guides'}
          subtitle={'Succinct graphical explanations to engineering topics.'}
        />
        <Container maxW='container.md' position='relative'>
          <SimpleGrid columns={[1, 1, 2]} mb='30px' spacing={['10px', '10px', '15px']}>
            {recentGuides.map((recentGuide, counter) => (
              <GuideGridItem
                key={recentGuide.id}
                href={`/guides/${recentGuide.id}`}
                title={recentGuide.title}
                subtitle={recentGuide.description}
                date={recentGuide.formattedUpdatedAt!}
                isNew
                colorIndex={counter}
              />
            ))}
          </SimpleGrid>

          <LinksList>
            {oldGuides.map(oldGuide => (
              <LinksListItem
                href={`/guides/${oldGuide.id}`}
                key={oldGuide.id}
                title={oldGuide.title}
                badgeText={oldGuide.isNew ? 'NEW' : ''}
                subtitle={oldGuide.formattedUpdatedAt!}
              />
            ))}
          </LinksList>
        </Container>
      </Box>

      <OpensourceBanner />
      <Footer />
    </Box>
  );
}

export async function getStaticProps() {
  return {
    props: {
      guides: getAllGuides()
    }
  };
}

