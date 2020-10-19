import VipDataSource from '../';

describe('IdentityDataSource', () => {
	it('should construct', () => {
		const ds = new VipDataSource('baseUrl', {});
		expect(ds).toBeDefined();
	});
});
