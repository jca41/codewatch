import { bucketsStore } from '$lib/stores';
import type { IBucket } from 'aw-client';
import { get } from 'svelte/store';

export function findBuckets(name: string) {
	return get(bucketsStore)
		.filter((b) => b.id.includes(name))
		.map((b) => b.id);
}

export function sortBucketsByDate(buckets: IBucket[]) {
	return buckets.sort((a, b) => {
		return a.created.getTime() - b.created.getTime();
	});
}
