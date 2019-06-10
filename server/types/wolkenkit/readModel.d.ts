import { Data } from 'wolkenkit';
import { Query, UpdateData, WhereClause } from 'wolkenkit/query';
import { ListAdd, ListRead, ListReadAndObserve, ListReadOne, ProjectionMethodSignature } from 'wolkenkit/-internals/readModel';

type Fields = {
	[key: string]: {
		initialState: any,
		fastLookup?: boolean;
		isUnique?: boolean;
	}
}

type Projections = {
	[key: string]: ProjectionMethodSignature;
}

// @TODO I split List and Reading List, maybe for later use in wolkenkit-client ?

interface ReadingList {
	read(query: Query): ListRead;
	readOne(query: Query): ListReadOne;
	readAndObserve(query: Query): ListReadAndObserve;
}

interface List extends ReadingList {
	/**
	 * Add an item to the list
	 *
	 * @param data the data to add
	 */
	add(data: Data): ListAdd;

	/**
	 * Update an item in the list
	 *
	 * @param data provide a where clause and an update expression
	 */
	update(data: UpdateData): void;

	/**
	 * Remove an item from the list
	 *
	 * @param data provide a where clause
	 */
	remove(data: { where: WhereClause }): void;
}
