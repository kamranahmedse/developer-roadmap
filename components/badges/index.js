import styled from 'styled-components';

export const BadgesList = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
`;

export const PrimaryBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  background: #2929ff;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  
  svg {
    height: 11px !important;
    margin-right: 5px;
    
    &.fa-clock {
      height: 10px !important;
    }
  }
`;

export const SecondaryBadge = styled(PrimaryBadge)`
  background: #696969;
  color: white;
`;

export const InfoBadge = styled(PrimaryBadge)`
  background: #039640;
  color: white;
`;

export const DarkBadge = styled(PrimaryBadge)`
  background: #101010;
  color: white;
`;

export const BadgeLink = styled.a`
  text-decoration: none;
  
  &:hover {
    text-decoration:none;
  }
`;
