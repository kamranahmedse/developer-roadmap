import styled from 'styled-components';

export const FooterWrap = styled.div`
  display: block;
  margin-top: 50px;
`;

export const FooterContainer = styled.div`
  max-width: 750px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const FooterBg = styled.div`
`;

export const ShareWrap = styled.div`
  padding: 17px 0px;
  align-items: center;
  justify-content: center;
  display: flex;

  a {
    display: flex;  
    align-items: center;
    color: #101010;

    svg {
      height: 18px;
      color: #757575;
      margin-left: 7px;
      transition: all 0.2s ease;
    }

    &:hover {
      svg {
        color: #101010;
      }
    }
  }
`;


export const ContributeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => props.hasMargins ? '0 30px' : '0'};
  
  span {
    margin-right: 4px;
  }
  
  a {
    color: #757575;
    font-size: 14px;
    transition: all 0.2s ease;
      
    &:hover {
      color: #101010;
    }
  }
`;

export const ShareIcons = styled.div`
  display: flex;
  align-items: center;
  color: #757575;
  font-size: 14px;

  span {
    margin-right: 4px;
  }
`;

export const AuthorInfoWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 0;

  h4 {
    position: relative;
    font-size: 22px;
    margin: 10px 0;
    line-height: 17px;

    a {
      font-weight: 700;
      color: #101010;
    }
  }
  
  .author-description {
    margin-bottom: 14px;
  }
`;

export const AuthorBio = styled.p`
  font-size: 15px;
  line-height: 24px;
  color: #757575;
  margin-bottom: 0;
  
  a {
    font-weight: 500;
  }
`;

export const AuthorImg = styled.img`
  border-radius: 100%;
  height: 100px;
  width: 100px;
  border-radius: 100%;
  margin-right: 22px;
`;

export const AuthorMeta = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
