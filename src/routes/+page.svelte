<script lang="ts">
	import { findBuckets } from '$lib/aw/buckets';
	import { Query } from '$lib/aw/query';
	import {
		BAR_DURATION_CONFIG,
		formatFiles,
		formatLanguages,
		formatProjects
	} from '$lib/charts/bar-duration';
	import ChartWidget from '$lib/components/chart-widget.svelte';
	import type { CodingData } from '$lib/contracts/aw';
	import { endDateStore, startDateStore } from '$lib/stores';
	import { createQueries } from '@tanstack/svelte-query';

	const vscodeBuckets = findBuckets(Query.BUCKETS.vscode);
	const CodingQuery = Query<CodingData>;

	$: queries = createQueries([
		{
			queryKey: ['code-projects'],
			queryFn: () =>
				new CodingQuery()
					.joinBuckets(vscodeBuckets)
					.noAFK()
					.mergeEventsByKeys(['project'])
					.sortBy('duration')
					.execute($startDateStore, $endDateStore)
		},
		{
			queryKey: ['code-languages'],
			queryFn: () =>
				new CodingQuery()
					.joinBuckets(vscodeBuckets)
					.noAFK()
					.mergeEventsByKeys(['language'])
					.sortBy('duration')
					.execute($startDateStore, $endDateStore)
		},
		{
			queryKey: ['code-files'],
			queryFn: () =>
				new CodingQuery()
					.joinBuckets(vscodeBuckets)
					.noAFK()
					.mergeEventsByKeys(['file'])
					.sortBy('duration')
					.limit(15)
					.execute($startDateStore, $endDateStore)
		}
	]);
</script>

<h1 class="mb-14">Coding</h1>
<div class="flex gap-2">
	<input
		class="input"
		type="datetime-local"
		max={$endDateStore}
		title="Start date"
		bind:value={$startDateStore}
	/>
	<input
		class="input"
		type="datetime-local"
		min={$startDateStore}
		title="End date"
		bind:value={$endDateStore}
	/>
</div>

<div class="grid grid-cols-1 token lg:grid-cols-2 gap-4 mt-10">
	<ChartWidget
		name={'Projects'}
		options={BAR_DURATION_CONFIG}
		data={formatProjects($queries[0].data)}
		loading={$queries[0].isLoading}
	/>

	<ChartWidget
		name={'Languages'}
		options={BAR_DURATION_CONFIG}
		data={formatLanguages($queries[1].data)}
		loading={$queries[1].isLoading}
	/>

	<ChartWidget
		name={'Top files'}
		options={BAR_DURATION_CONFIG}
		data={formatFiles($queries[2].data)}
		loading={$queries[2].isLoading}
	/>
</div>
