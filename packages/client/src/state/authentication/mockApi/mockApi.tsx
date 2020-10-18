import { isPassword, isPasswordRequirements } from "../../../util/isPassword";
import { testUsers, userPermissions } from "../testUsers";
import { Api, ApiResponse, EndpointsEnum, LoginResponse, RegisterResponse, User } from "./types";

export const mockApi: Api = async (endpoint: string, body: any) => {
  switch (endpoint) {
    case EndpointsEnum.login:
      let loginResponse: LoginResponse = {};
      const loginErrors: LoginResponse["errors"] = {};
      if (!body?.username) loginErrors.username = "username is required";
      if (!body?.password) loginErrors.password = "password is required";

      if (Object.keys(loginErrors).length) {
        loginResponse.error = "A field provided is invalid.";
        loginResponse.errors = loginErrors;
      } else {
        const user = testUsers.find(
          (u) => (u.email === body?.username || u.username === body?.username) && u.password === body?.password
        );
        if (user) {
          const { password, ...userClean } = user;
          loginResponse = {
            data: {
              user: userClean,
              token: "fakeToken",
              refreshToken: "fakeToken",
            },
          };
        } else {
          loginResponse.error = "email and/or password are invalid.";
        }
      }
      return loginResponse;
    case EndpointsEnum.register:
      let registerResponse: RegisterResponse = {};
      const registerErrors: RegisterResponse["errors"] = {};
      if (!body?.email) {
        registerErrors.email = "email is required";
      } else {
        const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(body.email);
        if (!emailValid) registerErrors.email = "email is invalid";
        else {
          const emailExists = testUsers.some((u) => u.email === body.email);
          if (emailExists) registerErrors.email = "email is already registered";
        }
      }
      if (!body?.username) registerErrors.username = "username is required";
      else {
        const usernameExists = testUsers.some((u) => u.username === body.username);
        if (usernameExists) registerErrors.username = "username is already taken";
      }
      if (!body?.givenName) registerErrors.givenName = "given name is required";
      if (!body?.surname) registerErrors.surname = "surname is required";
      if (!body?.password) registerErrors.password = "password is required";
      if (!body?.terms) registerErrors.terms = "terms must be accepted";
      else {
        if (!isPassword(body.password)) registerErrors.password = isPasswordRequirements;
      }
      if (Object.keys(registerErrors).length) {
        registerResponse.error = "A field provided is invalid.";
        registerResponse.errors = registerErrors;
      } else {
        const user: User = {
          ...body,
          terms: `${Date.now()}`,
          avatar: "",
          permissions: userPermissions,
        };
        registerResponse = {
          data: {
            user,
            token: "fakeToken",
            refreshToken: "fakeToken",
          },
        };
      }
      return registerResponse;
  }
  const error404: ApiResponse = { error: "Endpoint Invalid" };
  return error404;
};
