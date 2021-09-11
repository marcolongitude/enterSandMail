import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar/Navbar";
import GlobalStyle from "./globalStyles";
import Footer from './components/Footer'

import styled from "styled-components";

const Container = styled.div`
  /* Flexbox */
  display: flex;
  flex-direction: column;

  /* Width & Height */
  width: 100%;
  height: calc(100% - 60px);

  /* Misc */
  overflow: hidden;
  position: fixed;
`;

const HeaderWrapper = styled.header`
  /* Flexbox */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  /* Width & Height */
  width: 100%;
  height: 100%;

  /* Misc */
  overflow-y: scroll;
`;

const FooterWrapper = styled.footer``;
  



export const Layout = (props: { 
    children?: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; 
    header?: React.ReactNode;
  }) => {
  
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("reduxState");
    if (isAuth) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Container>
      <GlobalStyle />
      {isAuth && <Navbar />}
      <HeaderWrapper>{props.header}</HeaderWrapper>
      <Main>{props.children}</Main>
      {isAuth &&
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    }
    </Container>

  );
};

export default Layout;