import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuthentication } from "../../../../state/authentication";
import arrayDifference from "../../../../util/arrayDifference";
import NotFound from "../../../NotFound";
import LoginMeta from "../../routes/Login/meta";
import { DefaultComponent } from "./types";

const Component: DefaultComponent = (props) => {
  const {
    routeMeta: { permissions = [], hidden = false },
    children,
  } = props;
  const { state: authState } = useAuthentication();
  const location = useLocation();
  const missingPermissions = arrayDifference(permissions, authState.user.permissions);
  if (missingPermissions.length) {
    console.debug(`RouteAccessControl: Blocked by ${missingPermissions.join(",")}`);
    if (hidden || authState.user.username) return <NotFound />;
    return <Navigate to={`${LoginMeta.path}?from=${location.pathname}`} />;
  }
  return <>{children}</>;
};
export default Component;
