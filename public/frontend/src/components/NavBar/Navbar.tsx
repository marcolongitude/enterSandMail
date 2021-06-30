import React from "react";

import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";

import { flowService } from "../../helpers/flow";

import { Container, UlMenu, LiMenu, LinkRedirect } from './styles'

const NavBar = (): JSX.Element => {
  const handleLogout = () => {
    localStorage.removeItem("reduxState"); 
    flowService.goTo(ROUTES.LOGIN); 
  };

  return (
    <Container>
      <span>EnterSandMail</span>
      <UlMenu>
        <LiMenu>
          <LinkRedirect to={ROUTES.HOME}>Home</LinkRedirect>
        </LiMenu>
        <LiMenu>
          <LinkRedirect to={ROUTES.ABOUT}>About</LinkRedirect>
        </LiMenu>
        <LiMenu>
          <LinkRedirect to={ROUTES.CONTACT}>Criar usuário</LinkRedirect>
        </LiMenu>
        <LiMenu>
          <a href="/" onClick={handleLogout}>
            Logout
          </a>
        </LiMenu>
      </UlMenu>
    </Container>
  );
};

export default NavBar;
