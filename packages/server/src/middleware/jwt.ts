import expressJwt, { Options, RequestHandler } from 'express-jwt';

import config from '../lib/config';

export default function JwtMiddleware(opts?: Partial<Options>): RequestHandler {
	const jwtMiddleware = expressJwt({
		secret: config.authentication.secret,
		algorithms: ['HS256'],
		credentialsRequired: false,
	});
	return jwtMiddleware;
}
