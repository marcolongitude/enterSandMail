import React from "react";
import { Redirect } from "react-router-dom";

import { ROUTES } from "../constants";
import PublicRoute from "./PublicRoutes";

const PrivateRoute = (props: any) => {
  const { isAutenticated } = props;

  return (
    <>
      {isAutenticated && <PublicRoute {...props} />}

      {!isAutenticated && <Redirect to={ROUTES.LOGIN} />}
    </>
  );
};

export default PrivateRoute;
