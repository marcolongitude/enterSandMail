import React from 'react';
import NavBurger from './NavBurger';
import { NavMenu } from './styles'


const Navbar = () => {
  return (
    <NavMenu>
      <div className="logo">
        Enter SandMail
      </div>
      <NavBurger />
    </NavMenu>
  )
}


export default Navbar;
