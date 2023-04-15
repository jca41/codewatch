<script lang="ts">
	import { chart } from '$lib/actions/use-chart';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	export let name: string;
	export let options: Record<string, unknown>;
	export let data: unknown[] | undefined;
	export let loading: boolean;
	export let limit = 5;

	let applyLimit = true;

	$: chartOptions = {
		...options,
		series: [
			{ name, data: applyLimit && data && data?.length > limit ? data.slice(0, limit) : data || [] }
		]
	};
</script>

<div class="relative">
	{#if loading}
		<div class="absolute inset-0 z-10 flex items-center justify-center">
			<ProgressRadial stroke={80} />
		</div>
	{/if}
	<div class="relative">
		<h2 class="text-center">{name}</h2>
		{#if data && data?.length > limit}
			<div class="absolute flex flex-row justify-center right-0 inset-y-0">
				<button
					class="btn btn-sm variant-ringed-primary my-auto"
					on:click={() => {
						applyLimit = !applyLimit;
					}}>{applyLimit ? 'Show all' : 'Show less'}</button
				>
			</div>
		{/if}
	</div>
	<div use:chart={chartOptions} />
</div>
