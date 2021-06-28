import React from "react";

import { Link } from "react-router-dom";
import { ROUTES } from "../constants";

import { flowService } from "../helpers/flow";

const NavBar = (): JSX.Element => {
  const handleLogout = () => {
    localStorage.removeItem("reduxState"); 
    flowService.goTo(ROUTES.LOGIN); 
  };

  return (
    <>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ABOUT}>About</Link>
        </li>
        <li>
          <Link to={ROUTES.CONTACT}>Contact</Link>
        </li>
        <li>
          <a href="/" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
