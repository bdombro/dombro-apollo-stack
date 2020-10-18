import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';

import ApolloServer from '../../../index';
import OrdersDataSource from '../../../datasources/ois-apollo-datasource';

describe('Privacy: privacyReport query', () => {
	it('should return a valid response when an email is found', async () => {
		const PRIVACY_REPORT_QUERY = gql`
			query($input: PrivacyRequest!) {
				privacyReport(input: $input) {
					accessId
					privacyData
				}
			}
		`;

		const ordersDataSource = new OrdersDataSource();

		const server = new ApolloServer({
			dataSources: () => ({
				ois: ordersDataSource,
			}),
		});

		const mock = jest.spyOn(ordersDataSource, 'getPrivacyReport');

		mock.mockReturnValueOnce(
			Promise.resolve({
				accessId: '1',
				privacyData: JSON.stringify({
					'janedoe@example.com': {
						point: 'one',
					},
					'janedoe2@example.com': {
						point: 'two',
					},
				}),
			}),
		);

		const { query } = createTestClient(server);

		const { data, errors } = await query({
			query: PRIVACY_REPORT_QUERY,
			variables: {
				input: {
					emails: ['janedoe@example.com'],
					requestorEmail: 'johncsr@example.com',
					referenceNumber: 'abcdefg1234',
				},
			},
		});

		expect(errors).toBeUndefined();
		expect(data?.privacyReport).toBeDefined();
		expect(data?.privacyReport.accessId).toBe('1');
	});
});

describe('Privacy: deletePrivacyData mutation', () => {
	it('should return a valid response', async () => {
		const DELETE_PRIVACY_DATA_MUTATION = gql`
			mutation($input: PrivacyRequest!) {
				deletePrivacyData(input: $input)
			}
		`;

		const ordersDataSource = new OrdersDataSource();

		const server = new ApolloServer({
			dataSources: () => ({
				ois: ordersDataSource,
			}),
		});

		const mock = jest.spyOn(ordersDataSource, 'initiatePrivacyDeletion');

		mock.mockReturnValueOnce(Promise.resolve(2));

		const { query } = createTestClient(server);

		const { data, errors } = await query({
			query: DELETE_PRIVACY_DATA_MUTATION,
			variables: {
				input: {
					emails: ['janedoe@example.com'],
					requestorEmail: 'johncsr@example.com',
					referenceNumber: 'abcdefg1234',
				},
			},
		});

		expect(errors).toBeUndefined();
		expect(data?.deletePrivacyData).toBeDefined();
		expect(data?.deletePrivacyData).toBe(2);
	});
});
