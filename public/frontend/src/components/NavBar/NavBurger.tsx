import React, { useState } from 'react';
import NavRight from './NavRight';
import { StyledBurger } from './styles'

const NavBurger = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <NavRight open={open}/>
    </>
  )
}

export default NavBurger