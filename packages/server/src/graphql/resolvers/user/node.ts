import { skip } from 'graphql-resolvers';

import { ResolversTypes } from '../../../generated';
import { fromGlobalId } from '../../../lib/util';

import { PartialNodeResolver, ResolverTypes } from '..';

const NodeResolver: PartialNodeResolver<ResolversTypes['User']> = {
	async node(_, args, { dataSources: ds }) {
		const { type, id } = fromGlobalId(args.id);

		switch (type) {
			case ResolverTypes.User: {
				const user = await ds.user.byId(id);
				return (
					user && {
						...user,
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
