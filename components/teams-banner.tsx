import { Box, Button, Container, Heading, Link, Text } from '@chakra-ui/react';
import { event } from '../lib/gtag';

export function TeamsBanner() {
  return null;

  return (
    <Box bg='teal.500' borderTopWidth={1} py={['45px', '45px', '70px']} textAlign='center'>
      <Container maxW='container.sm'>
        <Heading as='h4' color={'white'} fontSize={['25px', '25px', '35px']} mb={['10px', '10px', '20px']}>Roadmaps for Teams</Heading>
        <Text lineHeight='26px' color={'white'} fontSize={['15px', '15px', '18px']} mb='20px'>We are working on a solution for teams. Help us shape the platform!</Text>
        <Button onClick={() => {
          event({
            category: 'UpcomingFeatureClick',
            action: `Teams Form Redirect`,
            label: `Click Teams Footer Link`
          });
        }} target={'_blank'} as={Link} href='https://forms.gle/6X2matbCmjmvYGGt6' _hover={{textDecoration: 'none', bg: 'gray.300'}}>Take a Survey</Button>
      </Container>
    </Box>
  );
}
