/* eslint-disable @typescript-eslint/no-unused-expressions */
import styled, { keyframes } from "styled-components";
import { colors } from '../../styles'

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
`;

export const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${colors.backgroundColorDefault};
    height: 40%;
    width: 65%;
    max-width: 600px;
    border-radius: 9px;
    padding: 30px
`;

export const Title = styled.h3`
    padding-bottom: 10px
`;

export const LogoSandMailImg = styled.img`
    height: 80px;
    margin: '-25px 0 10px 0'
`;

export const ContainerComponentsLogin = styled.div`
    width: 90%;
    max-width: 80%;
    margin: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const FormLogin = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%
`;

export const TextError = styled.span`
    color: #c40000;
    font-size: 14px;
    margin-top: -6px;
`;

export const ButtonSubmit = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.blueActive};
    margin: 15px 0 0 0;
    width: 100%;
    height: 46px;
    color: white;
    border: none;
    border-radius: 6px;
    &:hover {
        background-color: ${colors.blueHoverButton};
    }
`;

interface DotProps {
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