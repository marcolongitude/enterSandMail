import styled from 'styled-components'
import { colors } from '../../styles'

export const Container = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const Title = styled.h1`
  color: ${colors.blueActive}
`;

export const BoxOption = styled.div`
  margin: 50px;
  width: 30%;
  height: 390px;
  border-radius: 10px;
  background-color: ${colors.backgroundColorDefault};
  -webkit-box-shadow: 3px 5px 11px -5px #000000; 
  box-shadow: 3px 5px 11px -5px #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const AreaDragFile = styled.div`
    width: 80%;
    height: 60%;
    border: 1px dashed #8b8b8b;
    text-align: center;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    margin: 25px;
`;
export const ButtonSubmit = styled.button`
    background-color: ${colors.blueActive};
    cursor: pointer;
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

export const TitleBoxOption = styled.h2`
  color: ${colors.blueActive}
`;

export const TextBoxOption = styled.h4`
  color: ${colors.blueHoverButton}
`;

export const ButtonFileUpload = styled.input`
    color: transparent;
    &::-webkit-file-upload-button {
        visibility: hidden;
    }
    &:before {
      content: 'Carregar arquivo excel';
      color: black;
      display: inline-block;
      width: 50%;
      background: linear-gradient(top, #f9f9f9, #e3e3e3);
      border: 1px solid #999;
      border-radius: 3px;
      padding: 5px 8px;
      outline: none;
      white-space: nowrap;
      cursor: pointer;
      text-shadow: 1px 1px #fff;
      font-weight: 700;
      font-size: 10pt;
    }
    &:hover:before {
      border-color: black;
    }
    &:active:before {
      background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
    }
`;

export const ErrorFileNotSuported = styled.p`
    margin: 50px 0 15px 0;
`;
