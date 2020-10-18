import deepmerge from 'deepmerge';
import { GraphQLDateTime } from 'graphql-iso-date';
import { IResolvers } from 'graphql-tools';

import {
	MutationResolvers,
	QueryNodeArgs,
	QueryResolvers,
	Resolver,
	Resolvers,
	ResolversTypes,
} from '../../generated';
import PaginationCursor from '../../lib/scalars/pagination-cursor';
import { RequiredPick } from '../../lib/types';
import { Context } from '../context';

import user from './user';
import node from './node';

export type RootQueryResolver<K extends keyof QueryResolvers> = RequiredPick<
	QueryResolvers,
	K
>;

export interface PartialNodeResolver<
	R extends ResolversTypes['Node'] = ResolversTypes['Node']
> {
	node: Resolver<R | undefined | never, {}, Context, QueryNodeArgs>;
}

export type MutationResolver<K extends keyof MutationResolvers> = RequiredPick<
	MutationResolvers,
	K
>;

const scalars = {
	PaginationCursor,
	DateTime: GraphQLDateTime,
};

export enum ResolverTypes {
	User = 'User',
}

const resolvers = deepmerge.all<Resolvers>([
	user,
	node,
	scalars,
]);

export default resolvers as IResolvers;
