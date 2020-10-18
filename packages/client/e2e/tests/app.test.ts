import 'expect-puppeteer';
import { loadPage } from '../lib/load';

describe('React App', () => {
	it("should be titled 'Skipjack • Under Armour'", async () => {
		await loadPage({});
		expect(await page.title()).toBe('Skipjack • Under Armour');
	});
});
