import styled from 'styled-components'
import { colors } from '../../styles'

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
  align-items: center;
  margin: 50px 30px 0 30px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px
`;

export const UserCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
  width: 30%;
  height: 100px;
  background-color: ${colors.placeholder};
  -webkit-box-shadow: 3px 5px 11px -5px #000000; 
  box-shadow: 3px 5px 11px -5px #000000;
  border-radius: 5px;
  min-width: 300px;
  max-width: 400px;

  p {
    color: white;
  }
`;
