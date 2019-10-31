import styled from 'styled-components';

export const BlockLink = styled.a`
  border: 1px solid #f7f7f7;
  display: block;
  text-decoration: none;
  color: #000000;
  background: #ffffff;
  padding: 28px 25px 25px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 5px 10px;
  transition: box-shadow 0.2s ease 0s;
  cursor: pointer;
  margin-bottom: 32px;
  
  &:hover {
    text-decoration: none;
    color: #000000;
    box-shadow: rgba(0, 0, 0, 0.12) 0 30px 60px;
  }
`;

export const BlockTitle = styled.h4`
  line-height: 27px;
  font-weight: 600;
  font-size: 22px;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 0 0 auto;
  overflow: hidden;
`;

export const BlockSubtitle = styled.p`
  font-size: 15px;
  line-height: 25px;
  color: #999999;
  margin-bottom: 0;
`;