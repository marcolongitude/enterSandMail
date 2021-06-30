/* eslint-disable @typescript-eslint/no-unused-expressions */
import styled from 'styled-components'
import { colors } from '../../styles'

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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

interface InputProps {
    error: boolean
}
export const Input = styled.input`
    width: 100%;
    min-width: 80%;
    margin: 10px 0 10px 0;
    background-color: ${colors.backgroundInput};
    height: 46px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    border: ${(props: InputProps) => props.error ? '1px solid red': `1px solid ${colors.blueActive}`};
    ::placeholder,
    ::-webkit-input-placeholder {
        color: ${colors.placeholder};
        font-size: 15px;
    }
    :-ms-input-placeholder {
        color: ${colors.placeholder};
        font-size: 15px;
    }
    &:focus {
        outline: none;
    }
`;

export const TextError = styled.span`
    color: #c40000;
    font-size: 14px;
    margin-top: -6px;
`;

export const ButtonSubmit = styled.button`
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