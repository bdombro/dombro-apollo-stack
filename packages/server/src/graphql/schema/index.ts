import { readFileSync } from 'fs';

import { makeExecutableSchema } from 'graphql-tools';
import glob from 'glob';

import resolvers from '../resolvers';

const typeDefs = glob
	.sync('**/*.graphql', { cwd: __dirname })
	.map(src => readFileSync(require.resolve(`./${src}`), 'utf8'));

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	resolverValidationOptions: {
		// no cases currently exist where ambiguity could occur,
		// making __resolveType resolvers unnecessary
		// (cf. https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/)
		requireResolversForResolveType: false,
	},
});

export default schema;
