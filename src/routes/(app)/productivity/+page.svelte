<script lang="ts">
	import { Query } from '$lib/aw/query';
	import {
		BAR_DURATION_CONFIG,
		LIMIT,
		formatAppTitles,
		formatApps
	} from '$lib/charts/bar-duration';
	import { TIMELINE_CONFIG, formatTimeline } from '$lib/charts/timeline';
	import ChartTimeline from '$lib/components/chart-timeline.svelte';
	import ChartWidget from '$lib/components/chart-widget.svelte';
	import DatePicker from '$lib/components/date-picker.svelte';
	import Heading from '$lib/components/heading.svelte';
	import type { WindowData } from '$lib/contracts/aw';
	import type { QueryFnParams } from '$lib/contracts/tanstack';
	import { datesStore } from '$lib/stores';
	import { sumDurations } from '$lib/utils/datetime';
	import { createQueries } from '@tanstack/svelte-query';

	const WindowQuery = Query<WindowData>;

	$: queries = createQueries([
		{
			queryKey: ['apps', $datesStore.start, $datesStore.end],
			select: formatApps,
			queryFn: ({ queryKey }: QueryFnParams) =>
				new WindowQuery()
					.findBucket(WindowQuery.BUCKETS.window)
					.noAFK()
					.mergeEventsByKeys(['app'])
					.sortBy('duration')
					.limit(LIMIT)
					.execute(queryKey[1], queryKey[2])
		},
		{
			queryKey: ['app-titles', $datesStore.start, $datesStore.end],
			select: formatAppTitles,
			queryFn: ({ queryKey }: QueryFnParams) =>
				new WindowQuery()
					.findBucket(WindowQuery.BUCKETS.window)
					.noAFK()
					.filterEmptyValues('title')
					.mergeEventsByKeys(['title', 'app'])
					.sortBy('duration')
					.limit(LIMIT)
					.execute(queryKey[1], queryKey[2])
		},
		{
			queryKey: ['app-timeline', $datesStore.start, $datesStore.end],
			select: formatTimeline,
			queryFn: ({ queryKey }: QueryFnParams) =>
				new WindowQuery()
					.findBucket(WindowQuery.BUCKETS.window)
					.noAFK()
					.sortBy('timestamp')
					.execute(queryKey[1], queryKey[2])
		}
	]);
</script>

<Heading
	title="Productivity"
	icon="/productivity-icon.png"
	duration={sumDurations($queries[0].data, 'y')}
/>

<div class="space-y-2">
	<DatePicker />
</div>

<div class="my-4">
	<ChartTimeline
		name="Apps"
		options={TIMELINE_CONFIG}
		data={$queries[2].data}
		loading={$queries[2].isLoading}
	/>
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
