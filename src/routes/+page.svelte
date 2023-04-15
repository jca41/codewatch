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

	import ChartWidget from '$lib/components/chart-widget.svelte';
	import DatePicker from '$lib/components/date-picker.svelte';
	import Heading from '$lib/components/heading.svelte';
	import type { CodingData } from '$lib/contracts/aw';
	import { datesStore } from '$lib/stores';
	import { sumDurations, formatDuration } from '$lib/utils/datetime';
	import { createQueries } from '@tanstack/svelte-query';

	const vscodeBuckets = findBuckets(Query.BUCKETS.vscode);
	const CodingQuery = Query<CodingData>;

	$: queries = createQueries([
		{
			queryKey: ['code-projects'],
			select: formatProjects,
			queryFn: () =>
				new CodingQuery()
					.joinBuckets(vscodeBuckets)
					.noAFK()
					.mergeEventsByKeys(['project'])
					.sortBy('duration')
					.execute($datesStore.start, $datesStore.end)
		},
		{
			queryKey: ['code-languages'],
			select: formatLanguages,
			queryFn: () =>
				new CodingQuery()
					.joinBuckets(vscodeBuckets)
					.noAFK()
					.mergeEventsByKeys(['language'])
					.sortBy('duration')
					.execute($datesStore.start, $datesStore.end)
		},
		{
			queryKey: ['code-files'],
			select: formatFiles,
			queryFn: () =>
				new CodingQuery()
					.joinBuckets(vscodeBuckets)
					.noAFK()
					.mergeEventsByKeys(['file', 'project'])
					.sortBy('duration')
					.limit(LIMIT)
					.execute($datesStore.start, $datesStore.end)
		}
	]);
</script>

<Heading title="Coding" duration={sumDurations($queries[0].data, 'y')} />
<div class="space-y-2">
	<DatePicker />
</div>

<div class="grid grid-cols-1 token lg:grid-cols-2 gap-4 mt-10">
	<ChartWidget
		name={'Projects'}
		options={BAR_DURATION_CONFIG}
		data={$queries[0].data ?? []}
		loading={$queries[0].status === 'loading'}
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
