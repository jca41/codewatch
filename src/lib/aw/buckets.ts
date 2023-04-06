import { bucketsStore } from '$lib/stores';
import { get } from 'svelte/store';

export function findBuckets(name: string) {
	return Object.keys(get(bucketsStore)).filter((key) => key.includes(name));
}
