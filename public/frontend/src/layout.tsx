import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar/Navbar";
import GlobalStyle from "./globalStyles";

const Layout = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("reduxState");
    if (isAuth) {
      setIsAuth(true);
    }
  }, []);

  return (
    <div>
      <GlobalStyle />
      {isAuth && <Navbar />}
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;