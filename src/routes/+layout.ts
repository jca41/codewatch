import { awClient } from '$lib/aw/client';
import { bucketsStore } from '$lib/stores';

export const prerender = true;
export const ssr = false;

export async function load() {
	bucketsStore.set(await awClient.getBuckets());

	return {
		clientInfo: awClient.getInfo()
	};
}
