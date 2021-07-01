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
    width: 80%;
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
