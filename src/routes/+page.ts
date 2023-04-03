import { awClient } from '$lib/aw-client';

export async function load({ fetch }) {
	try {
		const data = await awClient.getBuckets();

		console.log(data);
	} catch (e) {
		console.log(e);
	}
	return {
		// buckets: awClient.getBuckets()
	};
}
