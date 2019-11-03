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
  top: 2px;
  left: -50px;
  height: 100%;
`;

export const ShareIcon = styled.span`
  margin-bottom: 8px;

  svg {
    height: 22px;
    color: #757575;
    transition: all 0.2s;
  }
  
  &:hover svg {
    color: #000000
  }
`;
