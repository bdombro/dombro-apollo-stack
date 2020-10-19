import jwt from 'jsonwebtoken';

import { NotFoundError } from '../../../lib/errors';
import passwords from '../../../lib/passwords';
import { fromGlobalId, toGlobalId } from '../../../lib/util';
import { connectionFromPaged, PaginationCursor } from '../../../lib/pagination';

import { MutationResolver, ResolverTypes, RootQueryResolver } from '..';
import { RequiredPick } from '../../../lib/types';
import { UserResolvers } from '../../../generated';
import config from '../../../lib/config';

const Query: RootQueryResolver<'user' | 'users' | 'token'> = {
	async user(_, { id }, { dataSources: ds }) {
		const user = await ds.inMemory.userById(fromGlobalId(id).id);

		if (!user) {
			throw new NotFoundError(`Unknown user ID ${id}`);
		}

		return {
			...user,
			id: toGlobalId(ResolverTypes.User, user.id),
		};
	},
	async users(_, args, { dataSources: ds }) {
		const users = await ds.inMemory.users({
			filters: args.filters || {},
			first: args.first,
			after: args.after
				? {
					createdAt: new Date(args.after.valueAsNumber(0)),
					id: args.after.valueAsString(1),
				}
				: undefined,
		});

		return connectionFromPaged(users, user => ({
			cursor: new PaginationCursor([user.createdAt.valueOf(), user.id]),
			node: {
				...user,
				id: toGlobalId(ResolverTypes.User, user.id),
			},
		}));
	},
	async token(_, { email, password }, { dataSources: ds }) {
		const user = await ds.inMemory.userByEmail(email);
		console.dir(await passwords.hash(password));
		if (!(user?.password && (await passwords.compare(password, user.password)))) {
			throw new NotFoundError(`User and/or Password Unknown`);
		}
		return jwt.sign({ id: user.id, roles: user.roles }, config.authentication.secret, { expiresIn: '1d' });
	},
};

const Mutation: MutationResolver<'createUser' | 'updateUser'> = {
	async createUser(_, { input }, { dataSources: ds }) {
		const user = await ds.inMemory.createUser(input);
		return {
			...user,
			id: toGlobalId(ResolverTypes.User, user.id),
		};
	},

	async updateUser(_, { input }, { dataSources: ds }) {
		const { id } = fromGlobalId(input.id);
		const user = await ds.inMemory.updateUser({ ...input, id });
		return { ...user, id: input.id };
	},
};

const User: RequiredPick<UserResolvers, 'posts'> = {
	async posts(parent, { first, after }, { dataSources: ds }) {
		const posts = await ds.inMemory.posts({
			filters: { authorId: fromGlobalId(parent.id).id },
			first,
			after: after
				? {
					createdAt: new Date(after.valueAsNumber(0)),
					id: after.valueAsString(1),
				}
				: undefined,
		});

		return connectionFromPaged(posts, post => ({
			cursor: new PaginationCursor([post.createdAt.valueOf(), post.id]),
			node: {
				...post,
				id: toGlobalId(ResolverTypes.Post, post.id),
			},
		}));
	},
};

export default {
	Query,
	Mutation,
	User,
};
