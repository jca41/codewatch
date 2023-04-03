import type { AWClient } from 'aw-client';

type MethodNames<T extends keyof AWClient = keyof AWClient> = T extends any
	? AWClient[T] extends (...args: any[]) => Promise<any>
		? T
		: never
	: never;

export type AwMethodReturnType<T extends MethodNames> = Awaited<ReturnType<AWClient[T]>>;
