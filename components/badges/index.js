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
    height: 11px;
    width: 11px;
    margin-right: 5px;
  }
`;

export const SecondaryBadge = styled(PrimaryBadge)`
  background: #696969;
  color: white;
`;
