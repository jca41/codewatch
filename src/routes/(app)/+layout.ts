import { awClient } from '$lib/aw/client';
import { bucketsStore } from '$lib/stores';
import { error } from '@sveltejs/kit';

export const prerender = true;
export const ssr = false;

export async function load() {
	try {
		bucketsStore.set(await awClient.getBuckets());
		return {
			clientInfo: awClient.getInfo(),
			error: false
		};
	} catch (e) {
		throw error(500);
	}
}
