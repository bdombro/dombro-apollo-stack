import { ApolloError } from 'apollo-server-errors';
import { combineResolvers } from 'graphql-resolvers';

import {
	NodeResolvers,
	Node as NodeType,
	QueryNodeArgs,
	QueryNodesArgs,
	Resolver,
} from '../../../generated';
import { fromGlobalId } from '../../../lib/util';
import user from '../user/node';
import { RequiredPick } from '../../../lib/types';
import { Context } from '../../context';

import { PartialNodeResolver, ResolverTypes, RootQueryResolver } from '..';

type NodeResolver = Resolver<NodeType | null, {}, Context, QueryNodeArgs>;
type NodesResolver = Resolver<(NodeType | null)[], {}, Context, QueryNodesArgs>;

const resolvers: PartialNodeResolver[] = [
	user,
];

const UnknownNodeType: PartialNodeResolver = {
	node(_, args) {
		const { type } = fromGlobalId(args.id);
		throw new ApolloError(`unknown node type: '${type}'`);
	},
};

// should be last
resolvers.push(UnknownNodeType);

// multiple type clashes with combineResolvers require type erasure
const node: NodeResolver = (combineResolvers<{}, Context>(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	...resolvers.map<any>(resolver => resolver.node),
) as unknown) as NodeResolver;

const nodes: NodesResolver =
	// codegen types expect Promise<(Maybe<Node>)[]> vs Promise<Maybe<Node>>[] but both are valid
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(parent, args, ...rest): any =>
		args.ids.map(id => node(parent, { id }, ...rest));

const Query: RootQueryResolver<'node' | 'nodes'> = {
	node,
	nodes,
};

const Node: RequiredPick<NodeResolvers, '__resolveType'> = {
	__resolveType(obj) {
		const { type } = fromGlobalId(obj.id);
		const match: ResolverTypes | null =
			Object.values(ResolverTypes).find(t => t === type) || null;
		return match;
	},
};

export default { Query, Node };
