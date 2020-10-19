/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserProfile
// ====================================================

export interface UserProfile_user {
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
}

export interface UserProfile {
  /**
   * Find a specific inMemory by it's globally uinque identifier
   */
  user: UserProfile_user | null;
}

export interface UserProfileVariables {
  id: string;
}
