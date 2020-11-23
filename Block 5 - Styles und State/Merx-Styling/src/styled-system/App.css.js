import styled from 'styled-components';
import variables from './variables';

export const SpreadSt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CleanSt = styled.div`
  border: 0;
  background-color: transparent;

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;
