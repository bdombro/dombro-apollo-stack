import { ServerRegistration } from 'apollo-server-express';

import ApolloServer from '../../graphql';
import JwtMiddleware from '../../middleware/jwt';

export default function registerGraphQL({
	app,
	...opts
}: ServerRegistration & { path: string }): void {
	const { path } = opts;

	app.use(path, JwtMiddleware());
	const server = new ApolloServer({ });

	server.applyMiddleware({ app, path, ...opts });
}
