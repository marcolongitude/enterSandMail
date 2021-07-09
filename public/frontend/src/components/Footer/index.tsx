import React from "react";

import { FooterWrapper, NavCompany, NavContacts } from './styles'

export const Footer = (): JSX.Element => {

  return (
    <FooterWrapper>
      <NavCompany>
        <p>TecMar technologies </p>
        <p>website and system development </p>
      </NavCompany>
      <NavContacts>
        <p>Instagram</p>
        <p>Facebook</p>
      </NavContacts>
    </FooterWrapper>
  )
}

export default Footer;