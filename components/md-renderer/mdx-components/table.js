import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: separate;
  width: 100%;
  border-spacing: 0;
  margin: 20px 0;

  th {
    color: #666;
    font-size: 12px;
    font-weight: 400;
    background: #FAFAFA;
    text-transform: uppercase;
    height: 40px;
    vertical-align: middle;
    padding: 5px 10px;
  }

  td {
    font-size: 14px;
    padding: 10px;
    border-bottom: 1px solid #EAEAEA;
  }
`;
