import { RequestHandler } from 'express';

import { PlaygroundOptions } from '../../lib/config';

import renderPlaygroundPage from './render-playground-page';

export default function Playground(
	endpoint: string,
	opts: PlaygroundOptions,
): RequestHandler {
	if (!opts.enabled) {
		return (_req, _res, next) => next();
	}

	return (_req, res) => {
		res.set('Content-Type', 'text/html');
		res.send(
			renderPlaygroundPage(
				{
					...opts,
					endpoint,
				},
				opts.authentication,
			),
		);
	};
}
