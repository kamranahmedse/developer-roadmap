import styled from 'styled-components';

const Link = styled.a`
  font-weight: 600;
`;

const EnrichedLink = props => {
  // Is external URL or is a media URL
  const isExternalUrl = /(^http(s)?:\/\/)|(\.(png|svg|jpeg|jpg)$)/.test(props.href);

  return (
    <Link href={ props.href } target={ isExternalUrl ? '_blank' : '_self' }>
      { props.children }
    </Link>
  );
};

export default EnrichedLink;
