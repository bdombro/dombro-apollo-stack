// Source https://github.com/prisma/graphql-playground/blob/master/packages/graphql-playground-html/src/render-playground-page.ts
/*
MIT License

Copyright (c) 2017 Graphcool

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import getLoadingMarkup from '@apollographql/graphql-playground-html/dist/get-loading-markup';
import { RenderPageOptions } from '@apollographql/graphql-playground-html';

import { PlaygroundAuthOptions } from '../../lib/config';

const loading = getLoadingMarkup();

const getCdnMarkup = ({
	version,
	cdnUrl = '//cdn.jsdelivr.net/npm',
	faviconUrl,
}: {
	version?: string;
	cdnUrl?: string;
	faviconUrl?: string | null;
}): string => `
		<link rel="stylesheet" href="${cdnUrl}/@apollographql/graphql-playground-react${
	version ? `@${version}` : ''
}/build/static/css/index.css" />
		${
			typeof faviconUrl === 'string'
				? `<link rel="shortcut icon" href="${faviconUrl}" />`
				: ''
		}
		${
			faviconUrl === undefined
				? `<link rel="shortcut icon" href="${cdnUrl}/@apollographql/graphql-playground-react${
						version ? `@${version}` : ''
				  }/build/favicon.png" />`
				: ''
		}
		<script src="//cdn.auth0.com/js/auth0-spa-js/1.0/auth0-spa-js.production.js"></script>
		<script src="${cdnUrl}/@apollographql/graphql-playground-react${
	version ? `@${version}` : ''
}/build/static/js/middleware.js"></script>
`;

export default function renderPlaygroundPage(
	options: RenderPageOptions & { subscriptionsEndpoint?: string },
	authOptions: PlaygroundAuthOptions,
): string {
	const extendedOptions: RenderPageOptions & {
		canSaveConfig: boolean;
		configString?: string;
	} = {
		...options,
		canSaveConfig: false,
	};
	// for compatibility
	if (options.subscriptionsEndpoint) {
		extendedOptions.subscriptionEndpoint = options.subscriptionsEndpoint;
	}
	if (options.config) {
		extendedOptions.configString = JSON.stringify(options.config, null, 2);
	}
	if (!extendedOptions.endpoint && !extendedOptions.configString) {
		throw new Error(
			`You didn't provide an endpoint and don't have a .graphqlconfig. Make sure you have at least one of them.`,
		);
	}

	return /* HTML */ `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui"
				/>
				<link
					href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Source+Code+Pro:400,700"
					rel="stylesheet"
				/>
				<title>${extendedOptions.title || 'GraphQL Playground'}</title>
				${extendedOptions.env === 'react' ||
				extendedOptions.env === 'electron'
					? ''
					: getCdnMarkup(extendedOptions)}
			</head>
			<body>
				<style type="text/css">
					html {
						font-family: 'Open Sans', sans-serif;
						overflow: hidden;
					}

					body {
						margin: 0;
						background: #172a3a;
					}

					.playgroundIn {
						-webkit-animation: playgroundIn 0.5s ease-out forwards;
						animation: playgroundIn 0.5s ease-out forwards;
					}

					@-webkit-keyframes playgroundIn {
						from {
							opacity: 0;
							-webkit-transform: translateY(10px);
							-ms-transform: translateY(10px);
							transform: translateY(10px);
						}
						to {
							opacity: 1;
							-webkit-transform: translateY(0);
							-ms-transform: translateY(0);
							transform: translateY(0);
						}
					}

					@keyframes playgroundIn {
						from {
							opacity: 0;
							-webkit-transform: translateY(10px);
							-ms-transform: translateY(10px);
							transform: translateY(10px);
						}
						to {
							opacity: 1;
							-webkit-transform: translateY(0);
							-ms-transform: translateY(0);
							transform: translateY(0);
						}
					}
				</style>
				${loading.container}
				<div id="root" />
				<script type="text/javascript">
					window.addEventListener('load', function(event) {
						${loading.script};

						const extendedOptions = ${JSON.stringify(
							extendedOptions,
							null,
							'\t',
						)};

						const root = document.getElementById('root');
						root.classList.add('playgroundIn');

						createAuth0Client(
							${JSON.stringify(authOptions, null, '\t')},
						)
							.then(function(auth0) {
								const loc = window.location;
								const params = new URLSearchParams(loc.search);
								const baseCreateApolloLink =
									window.schemaFetcher.linkGetter;

								if (!params.has('code')) {
									return auth0.loginWithRedirect({
										redirect_uri: loc.toString(),
									});
								}

								return auth0
									.handleRedirectCallback()
									.then(function() {
										return auth0.getTokenSilently();
									})
									.then(function(token) {
										const authHeaders = {
											Authorization: 'Bearer ' + token,
										};

										function createApolloLink(
											session,
											sub,
										) {
											return baseCreateApolloLink(
												Object.assign({}, session, {
													headers: Object.assign(
														{},
														authHeaders,
														session.headers,
													),
												}),
											);
										}

										GraphQLPlayground.init(
											root,
											Object.assign({}, extendedOptions, {
												createApolloLink: createApolloLink,
											}),
										);
									});
							})
							.catch(console.error)
							.then(function() {
								window.history.replaceState(
									{},
									document.title,
									window.location.pathname,
								);
							});
					});
				</script>
			</body>
		</html>
	`;
}
