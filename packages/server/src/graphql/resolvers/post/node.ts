import { skip } from 'graphql-resolvers';

import { ResolversTypes } from '../../../generated';
import { fromGlobalId } from '../../../lib/util';

import { PartialNodeResolver, ResolverTypes } from '..';

const NodeResolver: PartialNodeResolver<ResolversTypes['Post']> = {
	async node(_, args, { dataSources: ds }) {
		const { type, id } = fromGlobalId(args.id);

		switch (type) {
			case ResolverTypes.Post: {
				const post = await ds.post.postById(id);
				return (
					post && {
						...post,
						id: args.id,
					}
				);
			}
			default:
				return skip;
		}
	},
};

export default NodeResolver;
