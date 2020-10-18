import React from "react";
import { Link } from "react-router-dom";

import { testUsers } from "../../../../../../state/authentication/testUsers";
import IdRouteMeta from "../[id]/meta";

const IndexRoute: React.FC = () => {
  return (
    <>
      <div>Users</div>
      <ul>
        {testUsers.map((u, i) => (
          <li key={i}>
            <Link to={`${IdRouteMeta.path.replace(":id", "")}${i}`}>
              {u.givenName} {u.surname}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default IndexRoute;
