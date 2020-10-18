interface JWT {
	sub: string;
	iat: number;
	exp: number;
	aud: string;
	iss: string;
	jti: string;
	scope: string;
	[key: string]: unknown;
}
declare namespace Express {
	export interface Request {
		jwt?: JWT;
	}
}
