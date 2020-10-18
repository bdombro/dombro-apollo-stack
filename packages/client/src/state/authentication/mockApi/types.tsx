type ApiError = string;
type ApiErrors = {};

export enum UserFields {
  email = "email",
  password = "password",
  username = "username",
  givenName = "givenName",
  surname = "surname",
  avatar = "avatar",
  terms = "terms",
  permissions = "permissions",
}

export interface User {
  email: string;
  password: string;
  username: string;
  givenName: string;
  surname: string;
  avatar: string;
  terms: string;
  permissions: string[];
}

export enum EndpointsEnum {
  login = "/auth/token",
  register = "/auth/register",
  refresh = "/auth/token/refresh",
}

export interface ApiResponse {
  data?: any;
  error?: ApiError;
  errors?: ApiErrors;
}
export type UserResponse = {
  user: Omit<User, "password">;
  token: string;
  refreshToken: string;
};

export type LoginBody = Pick<User, "username" | "password">;
export type LoginErrors = Partial<Record<keyof LoginBody, string>>;
export interface LoginResponse extends ApiResponse {
  data?: UserResponse;
  errors?: LoginErrors;
}

export type RegisterBody = Pick<User, "username" | "email" | "username" | "givenName" | "surname" | "terms"> & {
  password: string;
};
export type RegisterErrors = Partial<Record<keyof RegisterBody, string>>;
export interface RegisterResponse extends ApiResponse {
  data?: UserResponse;
  errors?: RegisterErrors;
}

export type RefreshBody = {
  refreshToken: string;
};

export interface Api {
  (endpoint: EndpointsEnum.login, body: LoginBody): Promise<LoginResponse>;
  (endpoint: EndpointsEnum.register, body: RegisterBody): Promise<RegisterResponse>;
  (endpoint: EndpointsEnum.refresh, body: RefreshBody): Promise<LoginResponse>;
}
