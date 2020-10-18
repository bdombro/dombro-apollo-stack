import { ApolloError } from 'apollo-server-errors';

export class NotFoundError extends ApolloError {
	public constructor(message: string) {
		super(message, 'OBJECT_NOT_FOUND');

		Object.defineProperty(this, 'name', { value: 'NotFoundError' });
	}
}

export class TransactionConflictError extends ApolloError {
	public constructor(message: string) {
		super(message, 'TRANSACTION_CONFLICT');

		Object.defineProperty(this, 'name', {
			value: 'TransactionConflictError',
		});
	}
}
