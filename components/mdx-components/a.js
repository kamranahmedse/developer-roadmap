import styled from 'styled-components';

const Link = styled.a`
  font-weight: 600;
`;

const EnrichedLink = props => {
  return (
    <Link href={ props.href } target={ /^http(s)?:\/\//.test(props.href) ? '_blank' : '_self' }>
      { props.children }
    </Link>
  );
};

export default EnrichedLink;