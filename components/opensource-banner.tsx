import { Box, Container, Heading, Link, Text } from '@chakra-ui/react';

export function OpensourceBanner() {
  return (
    <Box bg='white' borderTopWidth={1} pt={['45px', '45px', '70px']} pb={['60px', '60px', '90px']} textAlign='center'>
      <Container maxW='container.md'>
        <Heading fontSize={['25px', '25px', '35px']} mb={['10px', '10px', '20px']}>Open Source</Heading>
        <Text lineHeight='26px' fontSize={['15px', '15px', '16px']} mb='20px'>The project is OpenSource,&nbsp;
          <Link
            _hover={{ textDecoration: 'none' }}
            href='https://github.com/search?o=desc&q=stars%3A%3E100000&s=stars&type=Repositories'
            target='_blank'
            borderBottomWidth={1}
            fontWeight={600}
          >6th most starred project on GitHub</Link> and is visited by hundreds of thousands of
          developers every month.</Text>
        <iframe
          src='https://ghbtns.com/github-btn.html?user=kamranahmedse&repo=developer-roadmap&type=star&count=true&size=large'
          frameBorder='0'
          scrolling='0'
          width='170'
          height='30'
          style={{ margin: 'auto', marginBottom: '30px' }}
          title='GitHub'
        />

        <Text lineHeight={['25px', '25px', '26px']} fontSize={['15px', '15px', '16px']} mb='15px'>A considerable amount of my time is spent doing unpaid
          community work on things that I hope will help humanity in some way. Your sponsorship helps me continue to
          produce more open-source and free educational material consumed by hundreds of thousands of developers every
          month.</Text>

        <Box>
          <iframe
            src='https://ghbtns.com/github-btn.html?user=kamranahmedse&type=sponsor&size=large'
            frameBorder='0'
            scrolling='0'
            width='260'
            height='30'
            title='GitHub'
            style={{ margin: 'auto' }}
          />
        </Box>
      </Container>
    </Box>
  );
}
