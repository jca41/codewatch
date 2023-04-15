<script lang="ts">
	import { formatDuration, sumDurations } from '$lib/utils/datetime';

	export let title: string, icon: string;
	export let duration: number = 0;
</script>

<div class="mb-14">
	<h1 class="flex items-center gap-3">
		<img src={icon} class="w-8 sm:w-12" />
		<span>
			{title}
		</span>
	</h1>
	<h3 class="mt-3 sm:mt-5 opacity-80">Total time: {formatDuration(duration)}</h3>
</div>
