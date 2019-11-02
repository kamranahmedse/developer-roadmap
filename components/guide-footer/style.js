import styled from 'styled-components';

export const FooterWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 70px;
  margin-top: 70px;

  h4 {
    position: relative;
    font-size: 22px;
    margin: 8px 0;
    line-height: 17px;

    a {
      font-weight: 700;
      color: #101010;
    }
  }

  .social-links {
    margin: 5px 0 0;

    a {
      border: 1px solid #757575;
      background: transparent;
      color: #757575;
      padding: 4px 10px;
      margin-right: 10px;
      border-radius: 5px;
      font-size: 10px;
      text-transform: uppercase;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        border-color: #757575;
      }

      svg {
        height: 16px;
        margin-right: 8px;
        fill: #757575;
      }
    }  
  }
  
  .author-description {
    margin-bottom: 14px;
  }
`;

export const AuthorBio = styled.p`
  font-size: 15px;
  line-height: 20px;
  color: #757575;
  margin-bottom: 7px;
`;

export const AuthorImg = styled.img`
  border-radius: 100%;
  height: 100px;
  width: 100px;
  border-radius: 100%;
  margin-right: 22px;
`;

export const WrittenBy = styled.p`
  font-size: 11px;
  text-transform: uppercase;
  color: #757575;
  display: block;
  margin-bottom: 0;
`;
export const AuthorInfoWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;