import React from 'react';
import { Text } from '@chakra-ui/react';
import styled from 'styled-components';

type EnrichedTextType = {
  children: React.ReactNode;
}

export const P = styled.p`
  line-height: 27px;
  font-size: 16px;
  color: black;
  margin-bottom: 18px;
`;
