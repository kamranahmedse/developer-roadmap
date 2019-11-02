import styled from 'styled-components';
import Link from '../icons/link.svg';

const linkify = (Component) => {
  return (props) => {
    const text = props.children;
    const id = text.toLowerCase && text
      .toLowerCase()
      .replace(/\s/g, '-')
      .replace(/[?!]/g, '');

    return (
      <Component id={ id }>
        <HeaderLink href={ `#${id}` }>
          <Link />
        </HeaderLink>
        { props.children }
      </Component>
    );
  };
};

const HeaderLink = styled.a`
  position: absolute;
  top: 0;
  left: -25px;
  width: 25px;
  display: none;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`;

const H1 = styled.h1`
  position: relative;
  font-size: 42px;
  font-weight: 700;
  margin: 30px 0 8px;
  
  &:hover ${HeaderLink} {
    display: flex;
  }
`;

const H2 = styled(H1).attrs({ as: 'h2' })`
  font-size: 36px;
`;

const H3 = styled(H1).attrs({ as: 'h3' })`
  margin: 22px 0 8px;
  font-size: 30px;
`;

const H4 = styled(H1).attrs({ as: 'h4' })`
  margin: 18px 0 8px;
  font-size: 24px;
`;

const H5 = styled(H1).attrs({ as: 'h5' })`
  margin: 14px 0 8px;
  font-size: 18px;
`;

const H6 = styled(H1).attrs({ as: 'h6' })`
  margin: 12px 0 8px;
  font-size: 18px;
`;

export const Headings = {
  h1: linkify(H1),
  h2: linkify(H2),
  h3: linkify(H3),
  h4: linkify(H4),
  h5: linkify(H5),
  h6: linkify(H6),
};
