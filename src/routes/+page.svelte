<script lang="ts">
	import { awClient } from '$lib/aw/client';
	import { Query } from '$lib/aw/query';
	import { bucketsStore } from '$lib/stores';
	import { createQuery } from '@tanstack/svelte-query';

	let startDate: string, endDate: string;

	const buckets = Object.values($bucketsStore);
	$: query = createQuery({
		enabled: Boolean(startDate),
		queryKey: ['my-query'],
		queryFn: () =>
			awClient.query(
				[{ start: new Date(startDate), end: endDate ? new Date(endDate) : new Date() }],
				[new Query().bucket(buckets[0]?.id).mergeEventsByKeys(['app']).sortBy('duration').return()]
			)
	});
</script>

<h1 class="mb-14">Coding</h1>
<div class="flex gap-2">
	<input
		class="input"
		type="datetime-local"
		max={endDate}
		title="Start date"
		bind:value={startDate}
	/>
	<input
		class="input"
		type="datetime-local"
		min={startDate}
		title="End date"
		bind:value={endDate}
	/>
</div>

<pre>{JSON.stringify($query.data, null, 2)}</pre>
