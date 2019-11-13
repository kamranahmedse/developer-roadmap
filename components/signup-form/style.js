import styled from 'styled-components';

export const SignUpWrap = styled.div`
  max-width: 400px;
  margin: 200px auto;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 17px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
`;

export const Textbox = styled.input`
  display: block;
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  height: auto;
  outline: none;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 5px;
  
  &:focus {
    border: 1px solid #101010;
  }
`;

export const Button = styled.button`
  -webkit-appearance: none;
  border: none;
  outline: none;
  box-shadow: none;
  display: block;
  text-align: center;
  width: 100%;
  padding: 10px 15px;
  margin-top: 10px;
  background: #333;
  color: white;
  border-radius: 5px;
  
  &:hover, &:active, &:focus {
    background: #000000;
    box-shadow: none;
    outline: none;
  }
`;
