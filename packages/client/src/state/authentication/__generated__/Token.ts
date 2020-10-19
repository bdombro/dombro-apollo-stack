/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Token
// ====================================================

export interface Token_token {
  __typename: "TokenResponse";
  accessToken: string;
  userId: string;
  roles: string[];
}

export interface Token {
  token: Token_token | null;
}

export interface TokenVariables {
  email: string;
  password: string;
}
