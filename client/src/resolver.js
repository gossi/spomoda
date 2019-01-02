import Resolver from 'ember-resolver/resolvers/fallback';
import buildResolverConfig from 'ember-resolver/ember-config';
import config from '../config/environment';

let moduleConfig = buildResolverConfig(config.modulePrefix);
/*
 * If your application has custom types and collections, modify moduleConfig here
 * to add support for them.
 */

Object.assign(moduleConfig.types, {
	config: { definitiveCollection: 'main' },
	util: { definitiveCollection: 'utils' },
	'ember-intl@adapter': { definitiveCollection: 'main' },
	'ember-intl@translation': { definitiveCollection: 'main' },
	formats: { definitiveCollection: 'main' },
	cldr: { definitiveCollection: 'main' },
	translation: { definitiveCollection: 'main' },
	'util:intl': { definitiveCollection: 'utils' },
	// 'component-manager': {definitiveCollection: 'main'}
});

moduleConfig.collections.main.types.push('config');
// moduleConfig.collections.main.types.push('component-manager');

export default Resolver.extend({
	config: moduleConfig
});
