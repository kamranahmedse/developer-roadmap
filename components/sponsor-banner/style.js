import styled from 'styled-components';

export const BannerWrap = styled.a`
  margin-bottom: 0;
  //background: #101010;
  //color: white;
  background: #ffe0b2;
  color: #d8362a;
  font-weight: 600;
  border: 0;
  border-radius: 0;
  padding: 10px 15px;
  display: block;
  text-align: center;
  transition: all 200ms;
  
  &:hover {
    background: #ffd698;
    color: #bd2015;
    text-decoration: none;
  }
`;

export const SponsorLogo = styled.img`
  height: 20px;
  margin-right: 10px;
  position: relative;
  top: -2px;
`;

export const EmojiWrap = styled.img`
  height: 18px;
  position: relative;
  top: -1px;
  margin: 0 6px 0 6px;
`;

export const CloseSponsor = styled.span`
  text-shadow: none;
  margin-right: 15px;
  position: relative;
  top: -2px;
  color: #101010;
  
  &:hover {
    opacity: 1;
    color: #101010;
  }
`;
