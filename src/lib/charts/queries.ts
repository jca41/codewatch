import { Query } from '$lib/aw/query';
import type { Event } from '$lib/contracts/aw';

export function queryDurationByKey<D extends Record<string, string>>(bucket: string, key: keyof D) {
	return new Query<Event<D>[]>()
		.bucket(bucket)
		.noAFK()
		.mergeEventsByKeys([key as string])
		.sortBy('duration');
}
