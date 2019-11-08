import styled from 'styled-components';

export const ItemWrap = styled.div`
  padding: 0 10px 20px;
`;

export const BlockItem = styled.a`
  min-height: 114px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 5px 10px;
  transition: box-shadow 0.2s ease 0s;
  align-items: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  max-width: 100%;
  background: white;
  padding: 20px;
  border-radius: 10px;
  justify-content: center;
  text-decoration:none;
  opacity: ${ props => props.disabled ? 0.5 : 1 };

  &:hover {
    text-decoration:none;
    box-shadow: rgba(0, 0, 0, 0.12) 0 30px 60px;
    z-index: 1;
  }
`;

export const ItemTitle = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #101010;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Badge = styled.span`
  font-size: 10px;
  font-weight: 600;
  background: #696969;
  color: white;
  padding: 0 8px;
  border-radius: 4px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  height: 18px;
`;

export const ItemSubtitle = styled.p`
  font-size: 14px;
  color: rgb(102, 102, 102);
  white-space: normal;
  line-height: 1.5;
  margin: 0;
`;
