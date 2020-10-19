import { NotFoundError } from '../../../lib/errors';
import { assertExists, fromGlobalId, toGlobalId } from '../../../lib/util';
import { connectionFromPaged, PaginationCursor } from '../../../lib/pagination';

import { MutationResolver, ResolverTypes, RootQueryResolver } from '..';
import { PostResolvers } from '../../../generated';
import { RequiredPick } from '../../../lib/types';

const Query: RootQueryResolver<'post' | 'posts'> = {
	async post(_, { id }, { dataSources: ds }) {
		const post = await ds.inMemory.postById(fromGlobalId(id).id);

		if (!post) {
			throw new NotFoundError(`Unknown post ID ${id}`);
		}

		return {
			...post,
			id: toGlobalId(ResolverTypes.Post, post.id),
		};
	},
	async posts(_, args, { dataSources: ds }) {
		const posts = await ds.inMemory.posts({
			filters: args.filters || {},
			first: args.first,
			after: args.after
				? {
						createdAt: new Date(args.after.valueAsNumber(0)),
						id: args.after.valueAsString(1),
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

const Mutation: MutationResolver<'createPost' | 'updatePost'> = {
	async createPost(_, { input }, { dataSources: ds }) {
		const post = await ds.inMemory.createPost(input);
		return {
			...post,
			id: toGlobalId(ResolverTypes.Post, post.id),
		};
	},

	async updatePost(_, { input }, { dataSources: ds }) {
		const { id } = fromGlobalId(input.id);
		const post = await ds.inMemory.updatePost({ ...input, id });
		return { ...post, id: input.id };
	},
};

const Post: RequiredPick<PostResolvers, 'author'> = {
	async author(parent, _args, { dataSources: ds }) {
		const author = assertExists(await ds.inMemory.userById(parent.authorId));

		return {
			...author,
			id: toGlobalId(ResolverTypes.User, author.id),
		};
	},
};

export default {
	Query,
	Mutation,
	Post
};
