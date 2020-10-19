/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
  __typename: "User";
  /**
   * Unique identifier, in the form of a node ID, for a inMemory. For more information on node IDs reference https: // relay.dev/
   */
  id: string;
  /**
   * User's name
   */
  name: string;
  /**
   * Timestamp of when inMemory was created
   */
  createdAt: any;
  /**
   * Timestamp of when inMemory was last updated
   */
  updatedAt: any;
  /**
   * Access Control Roles
   */
  roles: string[];
}

export interface User {
  /**
   * Find a specific inMemory by it's globally uinque identifier
   */
  user: User_user | null;
}

export interface UserVariables {
  id: string;
}
