import expressJwt, {
	Options,
	RequestHandler,
	SecretCallbackLong,
} from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

import config from '../lib/config';

export default function JwtMiddleware(opts?: Partial<Options>): RequestHandler {
	const jwksClient = {
		jwksUri: config.authentication.jwksUri,
		cache: true,
		rateLimit: true,
		cacheMaxEntries: 5,
		cacheMaxAge: 36000000,
		jwksRequestsPerMinute: 10,
	};
	const registry = new Map<string, SecretCallbackLong>();
	registry.set(
		config.authentication.issuer,
		expressJwtSecret(jwksClient),
	);
	registry.set(config.authentication.issuer, expressJwtSecret(jwksClient));

	const secret: SecretCallbackLong = (req, header, payload, done): void => {
		// verify JWT token based on issuer
		const middleware = registry.get(payload.iss);
		if (middleware) {
			return middleware(req, header, payload, done);
		}
		done(null, undefined);
	};

	return expressJwt({
		algorithms: 'RS256',
		clockTolerance: 30,
		secret,
		requestProperty: 'jwt',
		...opts,
	});
}
