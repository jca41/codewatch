<script lang="ts">
	import { Query } from '$lib/aw/query';
	import {
		BAR_DURATION_CONFIG,
		LIMIT,
		formatAppTitles,
		formatApps
	} from '$lib/charts/bar-duration';
	import ChartWidget from '$lib/components/chart-widget.svelte';
	import type { WindowData } from '$lib/contracts/aw';
	import { endDateStore, startDateStore } from '$lib/stores';
	import { createQueries } from '@tanstack/svelte-query';

	const WindowQuery = Query<WindowData>;

	$: queries = createQueries([
		{
			queryKey: ['apps'],
			queryFn: () =>
				new WindowQuery()
					.findBucket(WindowQuery.BUCKETS.window)
					.noAFK()
					.mergeEventsByKeys(['app'])
					.sortBy('duration')
					.limit(LIMIT)
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
					.limit(LIMIT)
					.execute($startDateStore, $endDateStore)
		}
	]);
</script>

<h1 class="mb-14">Productivity</h1>
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
</div>

<div class="grid grid-cols-1 token lg:grid-cols-2 gap-4 mt-10">
	<ChartWidget
		name={'Apps'}
		options={BAR_DURATION_CONFIG}
		data={formatApps($queries[0].data)}
		loading={$queries[0].isLoading}
	/>

	<ChartWidget
		name={'App titles'}
		options={BAR_DURATION_CONFIG}
		data={formatAppTitles($queries[1].data)}
		loading={$queries[1].isLoading}
	/>
</div>
