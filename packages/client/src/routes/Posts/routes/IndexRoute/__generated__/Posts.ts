/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Posts
// ====================================================

export interface Posts_posts_edges_node_author {
  __typename: "User";
  /**
   * Unique identifier, in the form of a node ID, for a inMemory. For more information on node IDs reference https: // relay.dev/
   */
  id: string;
  /**
   * User's name
   */
  name: string;
}

export interface Posts_posts_edges_node {
  __typename: "Post";
  /**
   * Unique identifier, in the form of a node ID, for a post. For more information on node IDs reference https: // relay.dev/
   */
  id: string;
  /**
   * DbPost's name
   */
  title: string;
  /**
   * Author of the post
   */
  author: Posts_posts_edges_node_author;
}

export interface Posts_posts_edges {
  __typename: "PostEdge";
  node: Posts_posts_edges_node;
}

export interface Posts_posts {
  __typename: "PostConnection";
  edges: Posts_posts_edges[];
}

export interface Posts {
  /**
   * Find a collection of posts by defined filters, may return 0 results
   */
  posts: Posts_posts | null;
}
