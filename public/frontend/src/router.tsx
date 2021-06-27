import React, { useEffect, useState } from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import Layout from "./layout";
import { Login } from "./pages";
import { Home } from "./pages";
import { ROUTES } from "./constants";

/* Import Custom Routes */
import PublicRoute from "./routers/PublicRoutes";
import PrivateRoute from "./routers/PrivateRoutes";

const Router = () => {
  const [isAutenticating, setAutnticating] = useState(true); 
  const [childProps, setChildProps] = useState({ isAutenticated: false }); 

  useEffect(() => {
    const isAuth = localStorage.getItem("reduxState");
    if (isAuth) {
      setChildProps({ isAutenticated: true });
    }
    setAutnticating(false);
  }, []);

  return (
    <>
      {!isAutenticating && ( 
        <BrowserRouter>
          <Switch>
            <Layout>
              <PublicRoute 
                {...childProps} 
                path={ROUTES.LOGIN}
                component={Login}
                exact
              />

              <PrivateRoute 
                {...childProps}
                path={ROUTES.HOME}
                component={Home}
                exact
              />
              {/* <PrivateRoute
                {...childProps}
                path={ROUTES.ABOUT}
                component={About}
                exact
              />
              <PrivateRoute
                {...childProps}
                path={ROUTES.CONTACT}
                component={Contact}
                exact
              /> */}
            </Layout>
          </Switch>
        </BrowserRouter>
      )}
    </>
  );
};

export default Router;