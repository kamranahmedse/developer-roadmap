import styled from 'styled-components';

export const HeaderWrap = styled.div`
  padding: 15px 0;
  font-size: 18px;

  .top-row {
    display: flex;
    align-items: center;
  }

  .brand img {
    padding: 5px 0;
    height: 50px;
    text-decoration: none;
    border-radius: 2px;
  }

  .nav-links {
    a {
      padding: 0 10px;
      text-decoration: none;
      font-size: 16px;
      color: #666;
    }

    .signup {
      background: #101010;
      border-radius: 5px;
      color: #ffffff;
      padding: 7px 10px;
      margin-left: 15px;

      &:hover {
        background: #2d2d2d;
      }
    }
  }
`;