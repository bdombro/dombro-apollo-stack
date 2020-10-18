const nconf = require('nconf');
const yaml = require('nconf-yaml');

//
// 1. any overrides
//
// nconf.overrides({
// 	'always': 'be this value'
// });

//
// 2. `process.env`
// 3. `process.argv`
//
// nconf.env().argv();

//
// 4. Values in files
//
nconf.file('local.yaml', { file: `config/local.yaml`, format: yaml });
nconf.file('env.yaml', { file: `config/${process.env.NODE_ENV}.yaml`, format: yaml });
nconf.file('base.yaml', { file: 'config/base.yaml', format: yaml });

//
// 5. Any default values
//
// nconf.defaults({
// 	'if nothing else': 'use this value'
// });


// Validate that there aren't missing values
const o = nconf.get();

function findNullsRecurssive(tree: any, parentPath = '', nulls: string[] = []) {
	Object.entries(tree).forEach(([k, v]) => {
		const path = parentPath ? `${parentPath}.${k}` : k;
		if (v === null) nulls.push(path);
		else if (typeof v === 'string') return;
		else findNullsRecurssive(v, path, nulls);
	});
	return nulls;
}
const nulls = findNullsRecurssive(o);

if(nulls.length) {
	throw `Env is missing variables: ${nulls}`;
}

// Extra trick to prevent rogue modules from leaking / dumping environment variables
// process.argv = [];
// process.env = {};

export default nconf;
