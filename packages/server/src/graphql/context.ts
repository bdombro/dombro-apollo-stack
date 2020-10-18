import { language } from '@hapi/accept';
import { Request, Response } from 'express';
import { AuthenticationError } from 'apollo-server-errors';

import { DataSources } from './datasources';

export interface ContextCreationParameters {
	req: Request;
	res: Response;
}

export interface User {
	scopes: string[];
}

export interface ContextInit {
	locale?: string;
	user: User;
}

export type Context = Readonly<
	ContextInit & {
		dataSources: Readonly<DataSources>;
	}
>;

export default async function createContext({
	req,
}: ContextCreationParameters): Promise<Readonly<ContextInit>> {
	if (!req.jwt) {
		throw new AuthenticationError(
			'Missing or invalid authorization header',
		);
	}

	const locale = language(req.get('accept-language')) || undefined;

	return {
		locale,
		user: {
			...req.jwt,
			scopes:
				typeof req.jwt.scope === 'string'
					? req.jwt.scope.split(' ')
					: [],
		},
	};
}
