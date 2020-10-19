import { language } from '@hapi/accept';
import { Request, Response } from 'express';

import { DataSources } from './datasources';

export interface ContextCreationParameters {
	req: Request;
	res: Response;
}

export interface User {
	id: string;
	roles: string[];
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

export default async function createContext({ req }: ContextCreationParameters): Promise<Readonly<ContextInit>> {
	const locale = language(req.get('accept-language')) || undefined;
	return {
		locale,
		user: {
			id: req.user?.id as string,
			roles: (req.user?.roles as string[]) || [],
		},
	};
}
