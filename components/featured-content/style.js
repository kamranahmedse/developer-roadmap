import styled from 'styled-components';

export const FeaturedContentWrap = styled.div`
  .featured-head {
    text-align: center;
    display: block;

    h3 {
      font-weight: 700;
      font-size: 35px;
      margin-bottom: 30px;
    }
  }

  .featured-separator {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 40px;
    margin-top: 25px;

    span {
      background: #f8f9fa;
    }

    a {
      background: black;
      color: white;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 14px;
      text-decoration: none;
      margin-left: 5px;
    }
  }

  .swim-lane {
    .featured-block {
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
        box-shadow: rgba(0, 0, 0, 0.12) 0 30px 60px;
      }

      h4 {
        line-height: 27px;
        font-weight: 600;
        font-size: 22px;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 0 0 auto;
        overflow: hidden;
      }

      p {
        font-size: 15px;
        line-height: 25px;
        color: #999999;
        margin-bottom: 0;
      }
    }
  }

  .guide-item {
    border-bottom: 1px solid #dee2e6;
    padding: 15px 10px;

    p {
      margin-bottom: 0;
      font-size: 15px;
      color: #999;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .journey-block {
    a {
      border: 1px solid #f7f7f7;
      display: block;
      text-decoration: none;
      color: #000000;
      background: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.12) 0 5px 10px;
      transition: box-shadow 0.2s ease 0s;
      cursor: pointer;
      margin-bottom: 32px;
      border-radius: 0 0 10px 10px;

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.12) 0 30px 60px;

        img {
          filter: grayscale(0);
        }
      }
    }

    .journey-meta {
      padding: 18px 25px 20px;

      h4 {
        line-height: 27px;
        font-weight: 600;
        margin-bottom: 0;
        font-size: 18px;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 0 0 auto;
        overflow: hidden;
      }

      p {
        font-size: 15px;
        line-height: 25px;
        color: #999999;
        margin-bottom: 0;
      }
    }

    img {
      width: 100%;
      filter: grayscale(1);
      border-radius: 10px 10px 0 0;
    }
  }
`;