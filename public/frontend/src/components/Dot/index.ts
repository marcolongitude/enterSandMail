import styled, { keyframes } from 'styled-components'


type DotProps = {
  delay: string
}

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

export const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Dot = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props: DotProps) => props.delay};
`;