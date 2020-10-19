/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users_edges_node {
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

export interface Users_users_edges {
  __typename: "UserEdge";
  node: Users_users_edges_node;
}

export interface Users_users {
  __typename: "UserConnection";
  edges: Users_users_edges[];
}

export interface Users {
  /**
   * Find a collection of users by defined filters, may return 0 results
   */
  users: Users_users | null;
}
