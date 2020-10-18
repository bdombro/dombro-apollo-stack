import React from "react";

import { useAuthentication } from "../../../../state/authentication";
import arrayDifference from "../../../../util/arrayDifference";
import { DefaultComponent } from "./types";

export const HocAccessControl: DefaultComponent = (props) => {
  const { permissions = [], hidden = false, children } = props;
  const { state: authState } = useAuthentication();
  const missingPermissions = arrayDifference(permissions, authState.user.permissions);
  if (missingPermissions.length) {
    console.debug(`ComponentAccessControl: Blocked by ${missingPermissions.join(",")}`);
    if (hidden) return <></>;
    return <>Section Unavailable to Your User</>;
  }
  return <>{children}</>;
};
