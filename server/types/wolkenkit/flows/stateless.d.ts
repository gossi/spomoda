import { Event, Services } from 'wolkenkit';

interface Reactions {
	[key: string]: (event: Event, services: Services) => void;
}
