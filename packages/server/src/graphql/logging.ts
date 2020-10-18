import { GraphQLExtension } from 'graphql-extensions';
import { GraphQLError } from 'graphql';

import logger from '../lib/logger';

import { Context } from './context';

function log(error: GraphQLError): void {
	const { path, extensions, originalError } = error;
	logger.error(
		`${
			originalError
				? originalError.stack
				: `${error.name}: ${error.message}`
		}\npath: ${JSON.stringify(path)}${
			extensions
				? `\nextensions: ${JSON.stringify(extensions, null, 2)}`
				: ''
		}`,
	);
}

class LoggingExtension extends GraphQLExtension<Context> {
	// part of inheritence
	// eslint-disable-next-line class-methods-use-this
	public didEncounterErrors(errors: readonly GraphQLError[]): void {
		errors.forEach(log);
	}
}

export default function Logging(): GraphQLExtension<Context> {
	return new LoggingExtension();
}
