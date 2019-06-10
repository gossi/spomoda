import { Data } from 'wolkenkit/-internals';

type UpdateData = {
	where: WhereClause;
	set: SetData;
}

type SetOperators = {
	/**
	 * Decreases the field by the given value.
	 */
	$decrementBy: number;

	/**
	 * Divides the field by the given value.
	 */
	$divideBy: number;

	/**
	 * Increments the field by the given value.
	 */
	$incrementBy: number;

	/**
	 * Multiplies the field by the given value.
	 */
	$multiplyBy: number;

	/**
	 * Adds the given value to the array.
	 */
	$add: any;

	/**
	 * Removes the given value from the array.
	 */
	$remove: any;
}

type SetData = Data | {
	[key: string]: SetOperators;
}

type LogicalOperators = {
	/**
	 * Matches items that match all conditions.
	 */
	$or: WhereClause[];

	/**
	 * Matches items that match at least one condition.
	 */
	$and: WhereClause[];
}

type WhereOperators = {
	/**
	 * Matches fields greater than the given value.
	 */
	$greaterThan: number;

	/**
	 * Matches fields greater than or equal to the given value.
	 */
	$greaterThanOrEqualTo: number;

	/**
	 * Matches fields less than the given value.
	 */
	$lessThan: number;

	/**
	 * Matches fields less than or equal to the given value.
	 */
	$lessThanOrEqualTo: number;

	/**
	 * Matches fields not equal to the given value.
	 */
	$notEqualTo: any;

	/**
	 * Matches arrays that contain the given value.
	 */
	$contains: any;

	/**
	 * Matches arrays that do not contain the given value.
	 */
	$doesNotContain: any;
}

type WhereClause = Data | LogicalOperators | {
	[key: string]: WhereOperators;
}

declare enum Sort {
	ASC = 'ascending',
	DESC = 'descending'
}

type Query = {
	where: WhereClause;
	orderBy?: {
		[key: string]: Sort;
	}
	skip?: number,
	take?: number;
}
