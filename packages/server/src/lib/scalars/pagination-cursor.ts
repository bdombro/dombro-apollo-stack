import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind } from 'graphql';

import { PaginationCursor } from '../pagination';

const config: GraphQLScalarTypeConfig<PaginationCursor, string> = {
	name: 'PaginationCursor',
	description: 'A cursor used in pagination',
	serialize(value) {
		if (value instanceof PaginationCursor) {
			return value.encode();
		}
		if (typeof value === 'string') {
			// do a roundtrip to ensure valid
			return PaginationCursor.decode(value).encode();
		}
		throw new TypeError(
			`PaginationCursor cannot be serialized from a non string or non PaginationCursor type ${JSON.stringify(
				value,
			)}`,
		);
	},
	parseValue(value) {
		if (!(typeof value === 'string')) {
			throw new TypeError(`PaginationCursor cannot represent non string type ${JSON.stringify(value)}`);
		}
		return PaginationCursor.decode(value);
	},
	parseLiteral(ast) {
		if (ast.kind !== Kind.STRING) {
			throw new TypeError(`PaginationCursor cannot represent non string type ${'value' in ast ? ast.value : ''}`);
		}
		const { value } = ast;
		return PaginationCursor.decode(value);
	},
};

export default new GraphQLScalarType(config);
