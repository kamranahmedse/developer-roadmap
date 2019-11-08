import styled from 'styled-components';

export const BlockLink = styled.a`
  border: 1px solid #f7f7f7;
  display: block;
  text-decoration: none;
  color: #000000;
  background: #ffffff;
  padding: 25px 25px 22px;
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

export const BlockMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 19px;
`;

export const PublishDate = styled.time`
  font-size: 13px;
  color: #999;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #999;
`;

export const AuthorImage = styled.img`
  height: 22px;
  width: 22px;
  border-radius: 100%;
  margin-right: 10px;
`;
export const AuthorName = styled.div``;