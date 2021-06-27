import React from "react";
import { Route } from "react-router-dom";

import { deepMerge } from "../helpers";
import renderMergedProps from "./renderMergedProps";

interface IProps {
  component: React.FC,  
  path: string,
  exact: boolean
}

const PublicRoute = ({ component, ...rest }: IProps) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return renderMergedProps(component, deepMerge(routeProps, rest));
      }}
    />
  );
};

export default PublicRoute;