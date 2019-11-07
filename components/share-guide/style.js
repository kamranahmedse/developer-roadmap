import styled from 'styled-components';

export const ShareIconsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 50px;
`;

export const ShareWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  padding: 0 0;
  top: 6px;
  left: -50px;
  height: 100%;
`;

export const ShareIcon = styled.a`
  display: block;
  width: 22px;
  height: 22px;
  margin-bottom: 8px;

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
