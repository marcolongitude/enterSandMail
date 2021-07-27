import styled from 'styled-components'
import { colors } from '../../styles'

export const ContactWrapper = styled.div`
  margin: 0 30px 0 30px;
`;

export const ContactCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
  padding: 15px;
  width: 30%;
  height: 100px;
  background-color: ${colors.placeholder};
  -webkit-box-shadow: 3px 5px 11px -5px #000000; 
  box-shadow: 3px 5px 11px -5px #000000;
  border-radius: 5px;
  margin: 0 0 15px 0;

  p {
    color: white;
  }
`;
