import { ApolloServer, Config } from 'apollo-server-express';

import config from '../lib/config';

import createContext from './context';
import createDataSources from './datasources';
import schema from './schema';
import Logging from './logging';

export default class extends ApolloServer {
	public constructor(opts: Config) {
		super({
			...config.apollo,
			schema,
			context: createContext,
			extensions: [Logging],
			dataSources: () => createDataSources(),
			...opts,
		});
	}
}
