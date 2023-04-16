<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import InstallSteps from './install-steps.svelte';
</script>

<aside class="alert variant-ghost-error">
	<div class="alert-message">
		<h1 class="mb-8">Error</h1>
		<div>
			<h3 class="mb-4">Troubleshooting:</h3>
			<InstallSteps />
		</div>
	</div>
	<div class="alert-actions">
		<button class="btn btn-xl variant-filled" on:click={() => invalidateAll()}>Reload</button>
	</div>
</aside>
