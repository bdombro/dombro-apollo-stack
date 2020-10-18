import { ErrorRequestHandler } from 'express';

import logger from '../lib/logger';

const handler: ErrorRequestHandler = (err, req, res, _next): void => {
	/* istanbul ignore next: ignore testing the trivial defaults */
	const { status = 500, message = 'Internal Service Error' } = err;
	res.status(status).send({ error: message });
	logger.error(req.method, req.originalUrl, err.stack, message);
};
export default handler;
