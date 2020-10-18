module.exports = {
	client: {
		service: {
			// eslint-disable-next-line global-require
			name: require('./package.json').name,
			localSchemaFile: './src/generated/schema.graphql',
		},
		includes: ['./test/**/*.ts'],
	},
};
