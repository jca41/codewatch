import { sortBucketsByDate } from '$lib/aw/buckets';
import { awClient } from '$lib/aw/client';
import { bucketsStore } from '$lib/stores';
import { error } from '@sveltejs/kit';

export async function load() {
	try {
		const buckets = await awClient.getBuckets();
		bucketsStore.set(sortBucketsByDate(Object.values(buckets)));
		return {
			clientInfo: awClient.getInfo(),
			error: false
		};
	} catch (e) {
		throw error(500);
	}
}
