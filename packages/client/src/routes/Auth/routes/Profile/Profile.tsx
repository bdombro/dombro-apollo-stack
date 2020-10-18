import React from "react";
import { Link } from "react-router-dom";

import { useAuthentication } from "../../../../state/authentication";
import DashboardMeta from "../../../Dashboard/meta";
import LogoutMeta from "../Logout/meta";

const Component: React.FC = () => {
  const { state: authState } = useAuthentication();
  return (
    <>
      <h1>Welcome to your profile, {authState.user.username}!</h1>
      <ul>
        <li>
          <Link to={DashboardMeta.path}>Goto dashboard</Link>
        </li>
        <li>
          <Link to={LogoutMeta.path}>Logout</Link>
        </li>
      </ul>
    </>
  );
};

export default Component;
