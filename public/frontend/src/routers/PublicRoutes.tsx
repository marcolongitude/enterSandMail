import React from "react";
import { Route } from "react-router-dom";

import { deepMerge } from "../helpers";
import renderMergedProps from "./renderMergedProps";

const PublicRoute = ({ component, ...rest }: any) => {
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