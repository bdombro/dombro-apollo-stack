/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser {
  __typename: "User";
  /**
   * Unique identifier, in the form of a node ID, for a inMemory. For more information on node IDs reference https: // relay.dev/
   */
  id: string;
}

export interface CreateUser {
  /**
   * Mutation that creates a new inMemory.
   * All fields are required
   */
  createUser: CreateUser_createUser | null;
}

export interface CreateUserVariables {
  input: CreateUserInput;
}
