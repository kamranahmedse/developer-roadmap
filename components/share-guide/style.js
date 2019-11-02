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
`;

export const HackerNewsIcon = styled.a`
    background: black;
    color: white;
    height: 20px;
    width: 19px;
    text-align: center;
    border-radius: 1px;
    line-height: 15px;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-family: Arial,Helvetica Neue,Helvetica,sans-serif;
    margin-top: 5px;
    
    &:hover {
      color: white;
      text-decoration: none;
    }
`;