import styled from 'styled-components'
import { colors } from '../../styles'

export const ContainerAddUser = styled.div`
  background-color: ${colors.backgroundPrimaryCard};
  -webkit-box-shadow: 3px 5px 11px -5px #000000; 
  box-shadow: 1px 3px 11px -8px #000000;
  border-radius: 5px;
  padding: 15px;
  margin: 20px;
`;

export const ContainerTitle = styled.div`
  width: 100%;
  text-align: center;
`;

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export const SideForm = styled.section`
  width: 45%;
  min-width: 305px;
`;