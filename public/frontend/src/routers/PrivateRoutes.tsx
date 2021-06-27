import React from "react";
import { Redirect } from "react-router-dom";

import { ROUTES } from "../constants";
import PublicRoute from "./PublicRoutes";

interface IProps {
  component: React.FC,  
  path: string,
  exact: boolean,
  isAutenticated: boolean
}

const PrivateRoute = (props: IProps) => {
  const { isAutenticated } = props;

  return (
    <>
      {isAutenticated && <PublicRoute {...props} />}

      {!isAutenticated && <Redirect to={ROUTES.LOGIN} />}
    </>
  );
};

export default PrivateRoute;
