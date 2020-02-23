import styled from 'styled-components';

export const Header = styled.div`
  text-align: center;
  padding: 45px 30px 10px;
`;

export const Title = styled.h1`
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 48px;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #444444;
`;

export const MenuItems = styled.div`
  margin: 35px 0 15px;
`;

export const MenuItemLink = styled.a`
  display: inline-block;
  position: relative;
  padding: 5px 10px 8px;
  text-decoration: none;
  color: rgb(102, 102, 102);
  font-size: 14px;
  font-weight: 400;
  text-transform: capitalize;
  &.active, &.active:hover {
    color: #2d2d2d;
    
    &:after {
      position: absolute;
      content: "";
      display: block;
      height: 0;
      left: 9px;
      right: 9px;
      bottom: -1px;
      border-bottom: 2px solid currentColor;
    }
  }
  
  &:hover {
    text-decoration: none;
    color: #111111;
  }
`;
