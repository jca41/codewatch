<script lang="ts">
	import InstallSteps from '$lib/components/install-steps.svelte';

	const AW_URL = 'https://activitywatch.net/';
</script>

<div class="space-y-8 text">
	<section>
		<p>
			<a href="https://github.com/jca41/codewatch">CodeWatch</a> is an open source desktop client
			for
			<a href={AW_URL}>ActivityWatch</a>.
		</p>
	</section>

	<section>
		<h2>Install & setup</h2>

		<InstallSteps />
	</section>
</div>

<style>
	.text *:not(h1, h2) {
		@apply text-lg sm:text-xl;
	}

	h2 {
		@apply mb-8;
	}
</style>
