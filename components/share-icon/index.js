import styled from 'styled-components';

export const ShareIcon = styled.a`
  display: block;
  width: 22px;
  height: 22px;
  margin-bottom: 8px;
  text-align: center;

  svg {
    height: 22px !important;
    width: 22px !important;
    color: #757575;
    transition: all 0.2s;
    vertical-align: top;
  }
  
  &:hover svg {
    color: #000000
  }
`;
