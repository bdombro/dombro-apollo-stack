import React from "react";
import useMetaTags from "react-metatags-hook";
import { Link, useParams } from "react-router-dom";

import { testUsers } from "../../../../../../state/authentication/testUsers";
import NotFound from "../../../../../NotFound";
import ParentMeta from "../../meta";
import routeMeta from "./meta";

const Component: React.FC = (props) => {
  const { id } = useParams();
  const user = testUsers?.[parseInt(id, 10)];
  useMetaTags({ title: `${routeMeta.title} ${user?.givenName} ${user?.surname} - Boilerplate` }, []);
  if (!user) return <NotFound {...props} />;
  return (
    <>
      <h1>User #{id}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>
        <Link to={ParentMeta.path}>
          <button>Go back</button>
        </Link>
      </div>
    </>
  );
};

export default Component;
