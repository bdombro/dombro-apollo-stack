import { PageInfo } from '../generated';

import {
	Base64String,
	fromGlobalId,
	safeRecord,
	toGlobalId,
	unbase64,
} from './util';

export interface PagedResult<T> {
	results: T[];
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	totalCount?: number;
}

export interface Connection<T> {
	edges: Edge<T>[];
	pageInfo: PageInfo;
	totalCount?: number;
}

export interface Edge<T> {
	node: T;
	cursor: PaginationCursor;
}

export class PaginationCursor {
	private readonly keyset: unknown[];

	public constructor(keyset: unknown[]) {
		this.keyset = keyset;
	}

	public encode(): Base64String {
		return toGlobalId('cursor', JSON.stringify(this.keyset));
	}

	public static decode(encoded: Base64String): PaginationCursor {
		const { type, id } = fromGlobalId(encoded);

		if (type !== 'cursor') {
			throw new TypeError(
				`Invalid cursor decoded as ${unbase64(encoded)}`,
			);
		}

		const keyset = JSON.parse(id);

		if (!Array.isArray(keyset)) {
			throw new TypeError(
				`Invalid cursor decoded as ${unbase64(encoded)}`,
			);
		}

		return new PaginationCursor(keyset);
	}

	public valueAsString(i: number): string {
		const value = this.keyset[i];
		if (typeof value !== 'string') {
			throw new TypeError(
				`Value at position ${i} was not a string. Value '${value}'`,
			);
		}
		return value;
	}

	public valueAsNumber(i: number): number {
		const value = this.keyset[i];
		if (typeof value !== 'number') {
			throw new TypeError(
				`Value at position ${i} was not a number. Value '${value}'`,
			);
		}
		return value;
	}
}

export function connectionFromPaged<T, R>(
	data: PagedResult<T>,
	mapper: (result: T) => Edge<R>,
): Connection<R> {
	const edges = data.results.map(mapper);

	const { 0: start, [edges.length - 1]: end } = edges;

	return {
		edges,
		pageInfo: {
			startCursor: safeRecord(start).cursor,
			endCursor: safeRecord(end).cursor,
			hasPreviousPage: data.hasPreviousPage,
			hasNextPage: data.hasNextPage,
		},
		totalCount: data.totalCount,
	};
}
