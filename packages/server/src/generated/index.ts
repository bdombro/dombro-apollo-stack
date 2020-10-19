/* eslint-disable @typescript-eslint/no-explicit-any */

import { PaginationCursor } from '../lib/pagination';
import { Merge } from '../lib/types';

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../graphql/context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of
   * the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
   */
  DateTime: Date;
  /** An opaque string that can be used in a pagination operation */
  PaginationCursor: PaginationCursor;
  JwtAccessToken: any;
  /** A string that represents a numeric money value */
  Money: Money;
};

export type CreatePostInput = {
  authorId?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};




export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Mutation that creates a new post.
   * All fields are required
   */
  createPost?: Maybe<Post>;
  /**
   * Mutation that creates a new inMemory.
   * All fields are required
   */
  createUser?: Maybe<User>;
  /**
   * Mutation that updates a specified post
   * Only field required is the ID.
   * DbPost can then update one to posts of the fields
   * If no fields are passed in, the post is not changed.
   */
  updatePost?: Maybe<Post>;
  /**
   * Mutation that updates a specified inMemory
   * Only field required is the ID.
   * User can then update one to users of the fields
   * If no fields are passed in, the inMemory is not changed.
   */
  updateUser?: Maybe<User>;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['PaginationCursor']>;
  endCursor?: Maybe<Scalars['PaginationCursor']>;
};


export type Post = Node & {
  __typename?: 'Post';
  /** Unique identifier, in the form of a node ID, for a post. For more information on node IDs reference https://relay.dev/ */
  id: Scalars['ID'];
  /** Timestamp of when post was created */
  createdAt: Scalars['DateTime'];
  /** Timestamp of when post was last updated */
  updatedAt: Scalars['DateTime'];
  /** Author of the post */
  author: User;
  /** DbPost's name */
  title: Scalars['String'];
};

/**
 * For further explanation on GraphQL connections and edges, reference
 * https://blog.apollographql.com/explaining-graphql-connections-c48b7c3d6976
 */
export type PostConnection = {
  __typename?: 'PostConnection';
  pageInfo: PageInfo;
  edges: Array<PostEdge>;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['PaginationCursor'];
  node: Post;
};

/** Possible fields to filter DbPost by */
export type PostListFilters = {
  authorId?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  /** Find a specific post by it's globally uinque identifier */
  post?: Maybe<Post>;
  /** Find a collection of posts by defined filters, may return 0 results */
  posts?: Maybe<PostConnection>;
  token?: Maybe<Scalars['JwtAccessToken']>;
  /** Find a specific inMemory by it's globally uinque identifier */
  user?: Maybe<User>;
  /** Find a collection of users by defined filters, may return 0 results */
  users?: Maybe<UserConnection>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['PaginationCursor']>;
  filters?: Maybe<PostListFilters>;
};


export type QueryTokenArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['PaginationCursor']>;
  filters?: Maybe<UserListFilters>;
};

export type UpdatePostInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type User = Node & {
  __typename?: 'User';
  /** Timestamp of when inMemory was created */
  createdAt: Scalars['DateTime'];
  /** User's email */
  email: Scalars['String'];
  /** Unique identifier, in the form of a node ID, for a inMemory. For more information on node IDs reference https://relay.dev/ */
  id: Scalars['ID'];
  /** User's name */
  name: Scalars['String'];
  /** All posts authored by this user */
  posts?: Maybe<PostConnection>;
  /** Timestamp of when inMemory was last updated */
  updatedAt: Scalars['DateTime'];
};


export type UserPostsArgs = {
  first?: Scalars['Int'];
  after?: Maybe<Scalars['PaginationCursor']>;
};

/**
 * For further explanation on GraphQL connections and edges, reference
 * https://blog.apollographql.com/explaining-graphql-connections-c48b7c3d6976
 */
export type UserConnection = {
  __typename?: 'UserConnection';
  pageInfo: PageInfo;
  edges: Array<UserEdge>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['PaginationCursor'];
  node: User;
};

/** Possible fields to filter User by */
export type UserListFilters = {
  email?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Node: ResolversTypes['Post'] | ResolversTypes['User'];
  Post: ResolverTypeWrapper<Omit<Post, 'author'> & { author: ResolversTypes['User'] }>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  User: ResolverTypeWrapper<Merge<DbUser, { id: string }>>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  PaginationCursor: ResolverTypeWrapper<Scalars['PaginationCursor']>;
  PostConnection: ResolverTypeWrapper<Omit<PostConnection, 'edges'> & { edges: Array<ResolversTypes['PostEdge']> }>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  PostEdge: ResolverTypeWrapper<Omit<PostEdge, 'node'> & { node: ResolversTypes['Post'] }>;
  PostListFilters: PostListFilters;
  JwtAccessToken: ResolverTypeWrapper<Scalars['JwtAccessToken']>;
  UserListFilters: UserListFilters;
  UserConnection: ResolverTypeWrapper<Omit<UserConnection, 'edges'> & { edges: Array<ResolversTypes['UserEdge']> }>;
  UserEdge: ResolverTypeWrapper<Omit<UserEdge, 'node'> & { node: ResolversTypes['User'] }>;
  Mutation: ResolverTypeWrapper<{}>;
  CreatePostInput: CreatePostInput;
  CreateUserInput: CreateUserInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Money: ResolverTypeWrapper<Scalars['Money']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: Scalars['ID'];
  Node: ResolversParentTypes['Post'] | ResolversParentTypes['User'];
  Post: Omit<Post, 'author'> & { author: ResolversParentTypes['User'] };
  DateTime: Scalars['DateTime'];
  User: Merge<DbUser, { id: string }>;
  String: Scalars['String'];
  Int: Scalars['Int'];
  PaginationCursor: Scalars['PaginationCursor'];
  PostConnection: Omit<PostConnection, 'edges'> & { edges: Array<ResolversParentTypes['PostEdge']> };
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean'];
  PostEdge: Omit<PostEdge, 'node'> & { node: ResolversParentTypes['Post'] };
  PostListFilters: PostListFilters;
  JwtAccessToken: Scalars['JwtAccessToken'];
  UserListFilters: UserListFilters;
  UserConnection: Omit<UserConnection, 'edges'> & { edges: Array<ResolversParentTypes['UserEdge']> };
  UserEdge: Omit<UserEdge, 'node'> & { node: ResolversParentTypes['User'] };
  Mutation: {};
  CreatePostInput: CreatePostInput;
  CreateUserInput: CreateUserInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Money: Scalars['Money'];
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JwtAccessTokenScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JwtAccessToken'], any> {
  name: 'JwtAccessToken';
}

export interface MoneyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Money'], any> {
  name: 'Money';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Post' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['PaginationCursor']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['PaginationCursor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PaginationCursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PaginationCursor'], any> {
  name: 'PaginationCursor';
}

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']> = {
  cursor?: Resolver<ResolversTypes['PaginationCursor'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  nodes?: Resolver<Array<Maybe<ResolversTypes['Node']>>, ParentType, ContextType, RequireFields<QueryNodesArgs, 'ids'>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<Maybe<ResolversTypes['PostConnection']>, ParentType, ContextType, RequireFields<QueryPostsArgs, 'first'>>;
  token?: Resolver<Maybe<ResolversTypes['JwtAccessToken']>, ParentType, ContextType, RequireFields<QueryTokenArgs, 'email' | 'password'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<ResolversTypes['UserConnection']>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'first'>>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Maybe<ResolversTypes['PostConnection']>, ParentType, ContextType, RequireFields<UserPostsArgs, 'first'>>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  cursor?: Resolver<ResolversTypes['PaginationCursor'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  DateTime?: GraphQLScalarType;
  JwtAccessToken?: GraphQLScalarType;
  Money?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PaginationCursor?: GraphQLScalarType;
  Post?: PostResolvers<ContextType>;
  PostConnection?: PostConnectionResolvers<ContextType>;
  PostEdge?: PostEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
