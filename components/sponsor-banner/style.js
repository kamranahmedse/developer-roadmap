import styled from 'styled-components';

export const BannerWrap = styled.a`
  margin-bottom: 0;
  background: #101010;
  color: white;
  border: 0;
  border-radius: 0;
  padding: 10px 15px;
  display: block;
  text-align: center;
  transition: all 200ms;
  
  &:hover {
    color: white;
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
  color: white;
  text-shadow: none;
  margin-right: 15px;
  position: relative;
  top: -2px;
  
  &:hover {
    opacity: 1;
    color: white;
  }
`;