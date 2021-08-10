import styled from 'styled-components'
import { colors } from '../../styles'

export const Select = styled.select`
  width: 100%;
  height: 46px;
  background-color: ${colors.backgroundInput};
  color: gray;
  border: 1px solid ${colors.blueActive};
  border-radius: 5px;
  padding-left: 5px;
  font-size: 14px;
  margin: 10px 0 10px 0;

  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 99%;
  background-position-y: 5px;

  option {
    color: black;
    background-color: ${colors.backgroundInput};
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;