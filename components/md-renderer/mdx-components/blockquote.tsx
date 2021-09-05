import styled from 'styled-components';

const BlockQuote = styled.blockquote`
  padding: 16px 20px;
  position: relative;
  background: #e8e8e8;
  border-radius: 5px;
  margin-bottom: 18px;

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
  }

  p + h4 {
    margin-top: 15px;
  }

  p {
    margin: 0;

    & + p {
      margin-top: 10px;
    }
  }
`;

export default BlockQuote;
