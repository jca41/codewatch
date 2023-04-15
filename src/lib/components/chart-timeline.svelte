<script lang="ts">
	import { chart } from '$lib/actions/use-chart';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let name: string;
	export let options: Record<string, unknown>;
	export let data: unknown[] | undefined;
	export let loading: boolean;
</script>

<div class="relative">
	{#if loading}
		<div class="absolute inset-0 z-10 flex items-center justify-center">
			<ProgressRadial stroke={80} />
		</div>
	{/if}
	<div use:chart={{ ...options, series: [{ name, data }] }} />
</div>
