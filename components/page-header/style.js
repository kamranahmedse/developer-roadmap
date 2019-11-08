import styled from 'styled-components';

export const HeaderWrap = styled.div`
  text-align: center;
  padding: 45px 30px;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #444;
  
  a {
    color: inherit;
    font-weight: 700;
  }
`;

export const HeaderButton = styled.a`
  box-shadow: rgba(0, 0, 0, 0.12) 0 5px 10px 0;
  padding: 9px 25px;
  background: ${ props => props.primary ? '#101010' : '#ffffff' } !important;
  color: ${ props => props.primary ? '#ffffff' : '#101010' } !important;
  border-radius: 4px;
  margin-left: ${ props => !props.primary ? '15px': 0 };
  cursor: pointer;
  font-size: 15px;
  display: inline-block;
`;

export const HeaderButtons = styled.div`
  margin: 30px 0 0;
`;
