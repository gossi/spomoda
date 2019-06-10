import { Event, Services } from 'wolkenkit';
import { UpdateData } from 'wolkenkit/-internals/query';
import { List } from 'wolkenkit/readModel';

type ProjectionMethodSignature = (aggregate: List, event: Event, services: Services) => void;

interface ListAdd {
	orUpdate(data: UpdateData): void;
	orDiscard(): void;
}

interface ListRead {
	failed(cb: (error: any) => void): ListRead;
	finished(cb: (models: any[]) => void): ListRead;
}

interface ListReadOne {
	failed(cb: (error: any) => void): ListReadOne;
	finished(cb: (model: any) => void): ListReadOne;
}

interface ListReadAndObserve {
	failed(cb: (error: any) => void): ListReadOne;
	started(cb: (models: any[], cancel: Function) => void): ListReadOne;
	updated(cb: (models: any[], cancel: Function) => void): ListReadOne;
}
