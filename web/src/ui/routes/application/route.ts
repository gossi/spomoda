import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import IntlService from 'ember-intl/services/intl';
import WolkenkitService from 'ember-wolkenkit/src/services/wolkenkit';
import wolkenkit from 'wolkenkit-client';

export default class ApplicationRoute extends Route {
	@service intl!: IntlService;
	@service wolkenkit!: WolkenkitService;

	async beforeModel() {
		await this.wolkenkit.connect({
			host: 'local.wolkenkit.io',
			port: 3000,
			authentication: new wolkenkit.authentication.OpenIdConnect({
				identityProviderUrl: 'https://gossi.eu.auth0.com/authorize',
				clientId: '3X32BTs46P5w3wliDgKPs9oB8TIYgWmv',
				scope: 'profile',
				strictMode: false
			})
		});

		this.intl.setLocale('en');
	}
}
