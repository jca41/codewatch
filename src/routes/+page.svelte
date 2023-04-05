<script lang="ts">
	import { chart } from '$lib/actions/use-chart';
	import { awClient } from '$lib/aw/client';
	import { Query } from '$lib/aw/query';
	import { bucketsStore } from '$lib/stores';
	import { createBarSeries, formatDuration } from '$lib/utils/chart-data';
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

<div
	class="w-full h-72 mt-12"
	use:chart={{
		theme: {
			mode: 'dark'
		},
		noData: {
			text: 'Loading...'
		},
		chart: {
			type: 'bar',
			background: 'transparent'
		},
		// fill: {
		// 	type: 'gradient'
		// },
		plotOptions: {
			bar: {
				horizontal: true
			}
		},
		dataLabels: {
			formatter(v) {
				return formatDuration(v);
			}
		},
		tooltip: {
			y: {
				formatter(v) {
					return formatDuration(v);
				}
			}
		},
		title: {
			text: 'App Usage'
		},
		series: [
			{
				name: 'App usage',
				data: createBarSeries($query.data?.[0] ?? [])
			}
		],
		xaxis: {
			type: 'numeric',
			labels: {
				show: true,
				formatter(v) {
					return formatDuration(v);
				}
			}
		}
	}}
/>
