<script lang="ts">
	import { formatDuration, sumDurations } from '$lib/utils/datetime';

	export let title: string;
	export let duration: number = 0;
</script>

<div class="mb-14">
	<h1>{title}</h1>
	<h3 class="mt-5 opacity-80">Total time: {formatDuration(duration)}</h3>
</div>
