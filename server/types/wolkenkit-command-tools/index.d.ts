import { CommandMethodSignature } from 'wolkenkit/writeModel/internals';

declare module 'wolkenkit-command-tools' {

	namespace only {
		function ifExists(): CommandMethodSignature;
		function ifNotExists(): CommandMethodSignature;
		function ifInPhase(phase: string | string[], propertyName?: string): CommandMethodSignature;
		function ifCommandValidatedBy(schema: any | Function): CommandMethodSignature;
		function ifStateValidatedBy(schema: any | Function): CommandMethodSignature;
	}
}
