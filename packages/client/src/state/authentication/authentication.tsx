import React from "react";
import { useInterval, useLocalStorage } from "react-use";

import { mockApi } from "./mockApi";
import { EndpointsEnum } from "./mockApi/types";
import { ContextType } from "./types";

export const defaultValue: ContextType["state"] = Object.freeze({
  user: {
    email: "",
    username: "",
    token: "",
    givenName: "",
    surname: "",
    terms: "",
    avatar: "",
    permissions: [],
  },
  token: "",
  refreshToken: "",
});

export const AuthenticationContext = React.createContext<ContextType>({
  state: defaultValue,
  login: async () => ({ error: "Not initialized" }),
  logout: async () => {},
  register: async () => ({ error: "Not initialized" }),
});

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [state = defaultValue, setState] = useLocalStorage<ContextType["state"]>("authentication", defaultValue);

  const login: ContextType["login"] = React.useCallback(
    async (creds) => {
      const res = await mockApi(EndpointsEnum.login, creds);
      if (!res.error) {
        setState(res.data);
      }
      return res;
    },
    [setState]
  );

  const logout: ContextType["logout"] = React.useCallback(async () => {
    setState(defaultValue);
  }, [setState]);

  const register: ContextType["register"] = React.useCallback(
    async (creds) => {
      const res = await mockApi(EndpointsEnum.register, creds);
      if (!res.error) {
        setState(res.data);
      }
      return res;
    },
    [setState]
  );

  const refresh = React.useCallback(async () => {
    if (state.refreshToken) {
      const res = await mockApi(EndpointsEnum.refresh, { refreshToken: state.refreshToken });
      if (!res.error) {
        setState(res.data);
      }
    }
  }, [setState, state.refreshToken]);

  useInterval(refresh, 10 * 1000);

  const values: ContextType = { state, login, logout, register };

  return <AuthenticationContext.Provider value={values}>{children}</AuthenticationContext.Provider>;
};

export function useAuthentication() {
  return React.useContext(AuthenticationContext);
}
