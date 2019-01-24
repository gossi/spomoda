module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	// parserOptions: {
	// 	"project": "./tsconfig.json",
	// 	"tsconfigRootDir": "."
	// },
	plugins: [
		'ember',
		'@typescript-eslint',
		// '@typescript-eslint/tslint'
	],
	extends: [
		'eslint:recommended',
		'plugin:ember/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	env: {
		browser: true
	},
	rules: {
		'indent': 'off',
		'prefer-const': 'error',
		'prefer-object-spread': 'error',
		'@typescript-eslint/adjacent-overload-signatures': 'error',
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/interface-name-prefix': ['error', 'never'],
		'@typescript-eslint/member-ordering': 'off',
		'@typescript-eslint/no-angle-bracket-type-assertion': 'error',
		'@typescript-eslint/no-inferrable-types': 'error',
		// '@typescript-eslint/tslint/config': ['warn', {
		// 	'lintFile': './tslint.json'
		// }],
	},
	overrides: [
		// node files
		{
			files: [
				'.eslintrc.js',
				'.template-lintrc.js',
				'ember-cli-build.js',
				'index.js',
				'testem.js',
				'blueprints/*/index.js',
				'config/**/*.js',
				'tests/dummy/config/**/*.js'
			],
			parser: 'babel-eslint',
			parserOptions: {
				sourceType: 'script',
				ecmaVersion: 2015
			},
			env: {
				browser: false,
				node: true
			}
		}
	]
};
