import http from 'http';
import { AddressInfo } from 'net';
import url from 'url';
import { promisify } from 'util';

import express, { Request } from 'express';
import bodyParser from 'body-parser';

import registerGraphQL from './controllers/graphql';
import defaultConfig, { Config } from './lib/config';
import errorMiddleware from './middleware/error';
import logger from './lib/logger';

export default (
	config: Config = defaultConfig,
): {
	listen: (port?: number) => Promise<http.Server>;
	close: () => Promise<void>;
} => {
	const app = express();
	const { path } = config.apollo;

	// Set express app config
	app.enable('case sensitive routing');
	app.enable('strict routing');
	app.disable('x-powered-by');

	async function onHealthCheck(_req: Request): Promise<void> {
		try {
			// const { n } = assertExists(
			// 	await db.queryOne({
			// 		text: 'SELECT 1 n',
			// 	}),
			// );
			// assert.strictEqual(n, 1);
		} catch (error) {
			logger.error('Health check failure', error);
			throw error;
		}
	}

	app.use(bodyParser.json({ strict: true }));

	// Avoid being crawled
	app.get('/robots.txt', (req, res) => {
		res.type('text/plain');
		res.send('DbUser-agent: *\nDisallow: /\n');
	});

	registerGraphQL({ app, onHealthCheck, path });

	// 404 Handler
	app.use((_, res) => {
		res.status(404).send({ error: 'Not Found' });
	});

	app.use(errorMiddleware);

	const server = http.createServer(app);

	function listen(): Promise<http.Server> {
		return new Promise((resolve, reject) => {
			server.once('error', reject);
			server.listen(config.port, () => {
				server.removeListener('error', reject);

				const { protocol, hostname } = url.parse(config.baseUrl);

				logger.info(
					'Listening on',
					url.format({
						protocol,
						hostname,
						port: (server.address() as AddressInfo).port,
					}),
				);

				resolve(server);
			});
		});
	}

	async function close(): Promise<void> {
		await promisify(server.close.bind(server))();
		// await db.end();
	}

	return Object.freeze({
		listen,
		close,
	});
};
