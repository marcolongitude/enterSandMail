import styled from 'styled-components'
import { colors } from '../../styles'

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${colors.blueActive}
`;

export const NavCompany = styled.nav`
  width: 40%;
  color: white;
`;

export const NavContacts = styled.nav`
  width: 40%;
  text-align: end;
  color: white;
`;