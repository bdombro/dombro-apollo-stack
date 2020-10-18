import { NotFoundError } from '../../../lib/errors';
import { assertExists, fromGlobalId, toGlobalId } from '../../../lib/util';
import { connectionFromPaged, PaginationCursor } from '../../../lib/pagination';
import { RequiredPick } from '../../../lib/types';
import { UserResolvers } from '../../../generated';

import { MutationResolver, ResolverTypes, RootQueryResolver } from '..';

const Query: RootQueryResolver<'user' | 'users' | 'users'> = {
	async user(_, { id }, { dataSources: ds }) {
		const user = await ds.user.byId(fromGlobalId(id).id);

		if (!user) {
			throw new NotFoundError(`Unknown user ID ${id}`);
		}

		return {
			...user,
			id: toGlobalId(ResolverTypes.User, user.userId),
		};
	},
	async users(_, args, { dataSources: ds }) {
		const users = await ds.user.all({
			filters: args.filters || {},
			first: args.first,
			after: args.after
				? {
						createdAt: new Date(args.after.valueAsNumber(0)),
						userId: args.after.valueAsString(1),
				  }
				: undefined,
		});

		return connectionFromPaged(users, user => ({
			cursor: new PaginationCursor([
				user.createdAt.valueOf(),
				user.userId,
			]),
			node: {
				...user,
				id: toGlobalId(ResolverTypes.User, user.userId),
			},
		}));
	},
	async users(_, args, { dataSources: ds }) {
		const users = await ds.user.all();
		return users.map(user => ({
			...user,
			id: toGlobalId(ResolverTypes.User, user.userId),
		}));
	},
};

const Mutation: MutationResolver<
	| 'createUser'
	| 'updateUser'
> = {
	async createUser(_, { input }, { dataSources: ds }) {
		const maybeUserId = input.userId
			? fromGlobalId(input.userId).id
			: null;
		const user = await ds.user.create(input, maybeUserId);

		return {
			...user,
			id: toGlobalId(ResolverTypes.User, user.userId),
		};
	},

	async updateUser(_, { input }, { dataSources: ds }) {
		const { id: userId } = fromGlobalId(input.id);

		const user = await ds.user.update(
			{ ...input, id: userId },
			input.userId ? fromGlobalId(input.userId).id : null,
		);

		return {
			...user,
			id: input.id,
			userId: toGlobalId(
				ResolverTypes.User,
				user.userId,
			),
		};
	},
};

export default {
	Query,
	Mutation,
};
