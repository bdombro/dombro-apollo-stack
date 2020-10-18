import { User } from "./mockApi/types";

export const adminPermissions = ["admin.dashboard"];
export const userPermissions = ["active.dashboard"];
export const adminUserAuth: User = {
  email: "admin@example.com",
  username: "admin",
  password: "CoolPassword9",
  givenName: "Admin",
  surname: "Foo",
  terms: `${Date.now()}`,
  avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000", // Get sizes by adding ?s=200
  permissions: [...userPermissions, ...adminPermissions],
};
export const normalUserAuth: User = {
  email: "nancy@example.com",
  username: "nancyDrew",
  password: "CoolPassword9",
  givenName: "Nancy",
  surname: "Drew",
  terms: `${Date.now()}`,
  avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50", // Get sizes by adding ?s=200
  permissions: userPermissions,
};
export const testUsers: User[] = [adminUserAuth, normalUserAuth];
