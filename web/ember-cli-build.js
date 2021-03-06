'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
	const app = new EmberApp(defaults, {
		babel: {
			sourceMaps: 'inline',
		},

		sourcemaps: {
			enabled: true,
			extensions: ['js', 'css']
		},

		cssModules: {
			plugins: {
				before: [
					require('postcss-import'),
					require('postcss-nested')
				],
				after: [
					require('autoprefixer')('last 2 versions')
				]
			}
		}
	});

	// use embroider here
	// const Webpack = require('@embroider/webpack').Webpack;
	// return require('@embroider/compat').compatBuild(app, Webpack);
	return app.toTree();
};
