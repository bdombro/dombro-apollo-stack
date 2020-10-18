import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { ForbiddenError } from 'apollo-server-errors';

import { ContextInit } from '../../context';
import Scope from '../../../lib/scopes';

export interface User {
	id: string;
	createdAt: string;
	updatedAt: string;
}

const nowUtc = (new Date()).toUTCString();
const testUser = {
	id: "1234",
	createdAt: nowUtc,
	updatedAt: nowUtc,
}
const testUsers = [testUser];

export default class UserDataSource extends DataSource<ContextInit> {
	protected context!: ContextInit;

	public initialize(config: DataSourceConfig<ContextInit>): void {
		this.context = config.context;
	}

	protected checkScope(scope: Scope): void {
		if (!this.context.user.scopes.includes(scope)) {
			throw new ForbiddenError(`Missing required scope: '${scope}'`);
		}
	}

	public async byId(id: User['id']): Promise<User | undefined> {
		this.checkScope(Scope.readUser);
		const user = testUsers.find(u => u.id === id);
		return user;
	}

	public async all(): Promise<User[]> {
		return testUsers;
	}
}
