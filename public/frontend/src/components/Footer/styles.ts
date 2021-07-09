import styled from 'styled-components'
import { colors } from '../../styles'

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100px;
  bottom: 0;
  position: absolute;
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