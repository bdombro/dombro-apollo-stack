import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';

import ApolloServer from '../../../index';
import { toGlobalId } from '../../../util';

describe('Node', () => {
	it('should return an error when querying an invalid type', async () => {
		const NODE_QUERY = gql`
			query($id: ID!) {
				node(id: $id) {
					id
				}
			}
		`;

		const { query } = createTestClient(new ApolloServer());

		const { data, errors } = await query({
			query: NODE_QUERY,
			variables: { id: toGlobalId('Fake', 'wat') },
		});

		expect(data?.node).toBeNull();
		expect(errors).toBeDefined();
		expect(errors?.[0].extensions?.code).toBe('OBJECT_NOT_FOUND');
		expect(errors?.[0].message).toBe('NotFoundError: Node not found');
	});
});
