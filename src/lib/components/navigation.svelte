<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	const LINKS = [
		{ title: 'Coding', path: '/' },
		{ title: 'Productivity', path: '/productivity' }
	];
</script>

<AppBar background="bg-surface-700/50" shadow="shadow-lg">
	<svelte:fragment slot="lead"
		><img class="h-7 object-contain" alt="CodeWatch" src="/logo.png" /></svelte:fragment
	>
	<svelte:fragment slot="trail"
		><div class="btn-group variant-ghost-secondary">
			{#each LINKS as link}
				<a href={link.path}>{link.title}</a>
			{/each}
		</div></svelte:fragment
	>
</AppBar>
