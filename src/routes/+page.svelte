<script lang="ts">
	import { findBuckets } from '$lib/aw/buckets';
	import { Query } from '$lib/aw/query';
	import {
		BAR_DURATION_CONFIG,
		LIMIT,
		formatFiles,
		formatLanguages,
		formatProjects
	} from '$lib/charts/bar-duration';
	import { TIMELINE_CONFIG, formatTimeline } from '$lib/charts/timeline';
	import ChartTimeline from '$lib/components/chart-timeline.svelte';

	import ChartWidget from '$lib/components/chart-widget.svelte';
	import DatePicker from '$lib/components/date-picker.svelte';
	import Heading from '$lib/components/heading.svelte';
	import type { CodingData } from '$lib/contracts/aw';
	import type { QueryFnParams } from '$lib/contracts/tanstack';
	import { datesStore } from '$lib/stores';
	import { sumDurations } from '$lib/utils/datetime';
	import { createQueries } from '@tanstack/svelte-query';

	const vscodeBuckets = findBuckets(Query.BUCKETS.vscode);
	const CodingQuery = Query<CodingData>;

	$: queries = createQueries([
		{
			queryKey: ['code-projects', $datesStore.start, $datesStore.end],
			select: formatProjects,
			queryFn: ({ queryKey }: QueryFnParams) =>
				new CodingQuery()
					.joinBuckets(vscodeBuckets)
					.noAFK()
					.mergeEventsByKeys(['project'])
					.sortBy('duration')
					.execute(queryKey[1], queryKey[2])
		},
		{
			queryKey: ['code-languages', $datesStore.start, $datesStore.end],
			select: formatLanguages,
			queryFn: ({ queryKey }: QueryFnParams) =>
				new CodingQuery()
					.joinBuckets(vscodeBuckets)
					.noAFK()
					.mergeEventsByKeys(['language'])
					.sortBy('duration')
					.execute(queryKey[1], queryKey[2])
		},
		{
			queryKey: ['code-files', $datesStore.start, $datesStore.end],
			select: formatFiles,
			queryFn: ({ queryKey }: QueryFnParams) =>
				new CodingQuery()
					.joinBuckets(vscodeBuckets)
					.noAFK()
					.mergeEventsByKeys(['file', 'project'])
					.sortBy('duration')
					.limit(LIMIT)
					.execute(queryKey[1], queryKey[2])
		},
		{
			queryKey: ['code-timeline', $datesStore.start, $datesStore.end],
			select: formatTimeline,
			queryFn: ({ queryKey }: QueryFnParams) =>
				new CodingQuery()
					.joinBuckets(vscodeBuckets)
					.noAFK()
					.sortBy('timestamp')
					.execute(queryKey[1], queryKey[2])
		}
	]);
</script>

<Heading title="Coding" icon="/coding-icon.png" duration={sumDurations($queries[0].data, 'y')} />
<div class="space-y-2">
	<DatePicker />
</div>
<div class="my-4">
	<ChartTimeline
		name="Coding"
		options={TIMELINE_CONFIG}
		data={$queries[3].data}
		loading={$queries[3].isLoading}
	/>
</div>

<div class="grid grid-cols-1 token lg:grid-cols-2 gap-4 mt-10">
	<ChartWidget
		name={'Projects'}
		options={BAR_DURATION_CONFIG}
		data={$queries[0].data ?? []}
		loading={$queries[0].isLoading}
	/>

	<ChartWidget
		name={'Languages'}
		options={BAR_DURATION_CONFIG}
		data={$queries[1].data ?? []}
		loading={$queries[1].isLoading}
	/>

	<ChartWidget
		name={'Files'}
		options={BAR_DURATION_CONFIG}
		data={$queries[2].data ?? []}
		loading={$queries[2].isLoading}
	/>
</div>
