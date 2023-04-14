<script lang="ts">
	import { findBuckets } from '$lib/aw/buckets';
	import { Query } from '$lib/aw/query';
	import {
		BAR_DURATION_CONFIG,
		formatAppTitles,
		formatApps,
		formatFiles,
		formatLanguages,
		formatProjects
	} from '$lib/charts/bar-duration';
	import ChartWidget from '$lib/components/chart-widget.svelte';
	import type { CodingData, WindowData } from '$lib/contracts/aw';
	import { endDateStore, startDateStore } from '$lib/stores';
	import { createQueries } from '@tanstack/svelte-query';

	const vscodeBuckets = findBuckets(Query.BUCKETS.vscode);
	const CodingQuery = Query<CodingData>;
	const WindowQuery = Query<WindowData>;

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
					.mergeEventsByKeys(['file', 'project'])
					.sortBy('duration')
					.limit(20)
					.execute($startDateStore, $endDateStore)
		},
		{
			queryKey: ['apps'],
			queryFn: () =>
				new WindowQuery()
					.findBucket(WindowQuery.BUCKETS.window)
					.noAFK()
					.mergeEventsByKeys(['app'])
					.sortBy('duration')
					.limit(20)
					.execute($startDateStore, $endDateStore)
		},
		{
			queryKey: ['app-titles'],
			queryFn: () =>
				new WindowQuery()
					.findBucket(WindowQuery.BUCKETS.window)
					.noAFK()
					.filterEmptyValues('title')
					.mergeEventsByKeys(['title', 'app'])
					.sortBy('duration')
					.limit(20)
					.execute($startDateStore, $endDateStore)
		}
	]);
</script>

<h1 class="mb-14">Coding</h1>
<div class="space-y-2">
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
	<div />
	<!-- <select class=" select">
		{#each $queries[0].data ?? [] as event (event['data']['project'])}
			<option>{lastPathSegment(event.data.project)}</option>
		{/each}
	</select> -->
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
		name={'Files'}
		options={BAR_DURATION_CONFIG}
		data={formatFiles($queries[2].data)}
		loading={$queries[2].isLoading}
	/>

	<ChartWidget
		name={'Apps'}
		options={BAR_DURATION_CONFIG}
		data={formatApps($queries[3].data)}
		loading={$queries[3].isLoading}
	/>

	<ChartWidget
		name={'App titles'}
		options={BAR_DURATION_CONFIG}
		data={formatAppTitles($queries[4].data)}
		loading={$queries[4].isLoading}
	/>
</div>
