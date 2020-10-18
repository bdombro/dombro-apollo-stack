import { LoginBody, LoginResponse, RegisterBody, RegisterResponse, UserResponse } from "./mockApi/types";

export type AuthState = UserResponse;

type Login = (creds: LoginBody) => Promise<LoginResponse>;
type Register = (creds: RegisterBody) => Promise<RegisterResponse>;
export type Logout = () => Promise<void>;

export type ContextType = {
  state: AuthState;
  login: Login;
  logout: Logout;
  register: Register;
};
