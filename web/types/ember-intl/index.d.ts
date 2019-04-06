declare module 'ember-intl/services/intl' {
	export default class IntlService {
		locale: string;
		primaryLocale: string;

		formatRelative(value: any, options?: any, formats?: any): string;


		exists(key: string, localeName: string): boolean;
		setLocale(locale: string): void;
		t(key: string, options?: any): string;

		addTranslations(localeName: string, payload: any): void;

	}
}
