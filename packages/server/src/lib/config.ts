import {
	Array,
	Boolean,
	Literal,
	Number,
	Record,
	Runtype,
	Static,
	String,
	Undefined,
	Union,
	Union2,
} from 'runtypes';
import CheckFilter from 'runtypes-filter';
import configLoader from './config-loader';

function Option<T>(t: Runtype<T>): Union2<Runtype<T>, Literal<undefined>> {
	return Union(t, Undefined);
}

const ConfigApolloEngine = Record({
	apiKey: Option(String),
});

// this is incomplete, add as needed
const ConfigApollo = Record({
	path: String,
	debug: Option(Boolean),
	tracing: Option(Boolean),
	introspection: Option(Boolean),
	engine: Union(Boolean, Undefined, ConfigApolloEngine),
	playground: Option(Boolean),
});

export type ConfigApollo = Static<typeof ConfigApollo>;

// const ConfigDatabase = Record({
// 	user: Option(String),
// 	password: Option(String),
// 	database: Option(String),
// 	host: Option(String),
// 	port: Option(Number),
// });

// export type ConfigDatabase = Static<typeof ConfigDatabase>;

const ConfigAuthentication = Record({
	jwksUri: String,
	issuer: String,
	audience: String,
});

const Config = Record({
	baseUrl: String,
	port: Number,
	apollo: ConfigApollo,
	authentication: ConfigAuthentication,
});

export type Config = Static<typeof Config>;

const filterConfig = CheckFilter(Config);

export function getConfig(): Config {
	return filterConfig(configLoader.get());
}

export default getConfig();
