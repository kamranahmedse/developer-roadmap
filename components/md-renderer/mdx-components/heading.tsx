import React from 'react';
import styled from 'styled-components';
import LinkIcon from 'components/icons/link.svg';

const linkify = (Component: React.FunctionComponent<any>) => {
  return function EnrichedHeading(props: { children: string }): React.ReactNode {
    const text = props.children;
    const id = text?.toLowerCase && text
      .toLowerCase()
      .replace(/[^\x00-\x7F]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[?!]/g, '');

    return (
      <Component id={id}>
        <HeaderLink href={`#${id}`}>
          <LinkIcon />
        </HeaderLink>
        {props.children}
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
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  margin: 20px 0 10px !important;

  &:hover ${HeaderLink} {
    display: flex;
  }
`;

const H2 = styled(H1).attrs({ as: 'h2' })`
  font-size: 30px;
`;

const H3 = styled(H1).attrs({ as: 'h3' })`
  margin: 22px 0 8px;
  font-size: 28px;
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

const Headings = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6
};

export default Headings;
