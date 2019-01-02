export enum InstrumentType {
	MANIPULATIVE = 'manipulative',
	SUPPORTIVE = 'supportive',
	MOVENDUM = 'movendum'
}

export default interface Instrument {
	id: string;
	sportId: string;
	title: string;
	slug: string;
	descrption: string;
	type: InstrumentType;
}
