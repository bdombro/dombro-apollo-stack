import React from "react";
import { Link } from "react-router-dom";

import { useAuthentication } from "../../../../state/authentication";
import LoginMeta from "../Login/meta";

const Logout: Logout = () => {
  const { logout } = useAuthentication();
  React.useEffect(() => {
    logout();
  }, [logout]);
  return (
    <>
      <div>
        You have been logged out. <Link to={LoginMeta.path}>Log back in?</Link>
      </div>
    </>
  );
};
export default Logout;

export type LogoutProps = {};
export type Logout = React.FC<LogoutProps>;
