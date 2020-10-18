const junitFormatter = require('eslint/lib/cli-engine/formatters/junit');
const stylishFormatter = require('eslint/lib/cli-engine/formatters/stylish');

module.exports = function(results) {
	console.log(stylishFormatter(results));
	return junitFormatter(results);
};
