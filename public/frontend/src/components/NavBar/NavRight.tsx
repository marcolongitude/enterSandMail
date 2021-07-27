import React from 'react';
import { ROUTES } from "../../constants";
import { flowService } from "../../helpers/flow";
import { UlMenu, LinkRedirect, LiMenu, ButtonLogout } from './styles'

interface Props {
  open: boolean
}


const NavRight = ({ open }: Props) => {
  const handleLogout = () => {
    localStorage.removeItem("reduxState"); 
    flowService.goTo(ROUTES.LOGIN); 
  };
  return (
    <UlMenu open={open}>
      <LiMenu>
        <LinkRedirect to={ROUTES.HOME}>Home</LinkRedirect>
      </LiMenu>
      <LiMenu>
        <LinkRedirect to={ROUTES.ABOUT}>About</LinkRedirect>
      </LiMenu>
      <LiMenu>
        <LinkRedirect to={ROUTES.USERS}>Criar usuário</LinkRedirect>
      </LiMenu>
      <LiMenu>
        <ButtonLogout href="/" onClick={handleLogout}>
          Logout
        </ButtonLogout>
      </LiMenu>
    </UlMenu>
  )
}

export default NavRight