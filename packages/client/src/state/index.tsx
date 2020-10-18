import React from "react";

import { AuthenticationProvider } from "./authentication";
export { useAuthentication } from "./authentication";

class Providers extends React.Component {
  render() {
    const { children } = this.props;
    return <AuthenticationProvider>{children}</AuthenticationProvider>;
  }
}
export default Providers;
