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
  top: 0;
  left: -50px;
  height: 100%;
`;

export const ShareIcon = styled.span`
  margin-bottom: 7px;
  svg {
    height: 26px;
    color: #101010;
  }
`;