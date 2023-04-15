<script lang="ts">
	import { Query } from '$lib/aw/query';
	import {
		BAR_DURATION_CONFIG,
		LIMIT,
		formatAppTitles,
		formatApps
	} from '$lib/charts/bar-duration';
	import ChartWidget from '$lib/components/chart-widget.svelte';
	import DatePicker from '$lib/components/date-picker.svelte';
	import Heading from '$lib/components/heading.svelte';
	import type { WindowData } from '$lib/contracts/aw';
	import { datesStore } from '$lib/stores';
	import { formatDuration, sumDurations } from '$lib/utils/datetime';
	import { createQueries } from '@tanstack/svelte-query';

	const WindowQuery = Query<WindowData>;

	$: queries = createQueries([
		{
			queryKey: ['apps'],
			select: formatApps,
			queryFn: () =>
				new WindowQuery()
					.findBucket(WindowQuery.BUCKETS.window)
					.noAFK()
					.mergeEventsByKeys(['app'])
					.sortBy('duration')
					.limit(LIMIT)
					.execute($datesStore.start, $datesStore.end)
		},
		{
			queryKey: ['app-titles'],
			select: formatAppTitles,
			queryFn: () =>
				new WindowQuery()
					.findBucket(WindowQuery.BUCKETS.window)
					.noAFK()
					.filterEmptyValues('title')
					.mergeEventsByKeys(['title', 'app'])
					.sortBy('duration')
					.limit(LIMIT)
					.execute($datesStore.start, $datesStore.end)
		}
	]);
</script>

<Heading title="Productivity" duration={sumDurations($queries[0].data, 'y')} />

<div class="space-y-2">
	<DatePicker />
</div>

<div class="grid grid-cols-1 token lg:grid-cols-2 gap-4 mt-10">
	<ChartWidget
		name={'Apps'}
		options={BAR_DURATION_CONFIG}
		data={$queries[0].data ?? []}
		loading={$queries[0].isLoading}
	/>

	<ChartWidget
		name={'App titles'}
		options={BAR_DURATION_CONFIG}
		data={$queries[1].data ?? []}
		loading={$queries[1].isLoading}
	/>
</div>
