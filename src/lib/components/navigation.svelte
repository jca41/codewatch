<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	const LINKS = [
		{ title: 'Coding', path: '/' },
		{ title: 'Productivity', path: '/productivity' }
	];
</script>

<AppBar>
	<svelte:fragment slot="lead"><img class="h-6" alt="CodeWatch" src="/logo.png" /></svelte:fragment>
	<svelte:fragment slot="trail"
		><div class="btn-group variant-ghost-secondary">
			{#each LINKS as link}
				<a href={link.path}>{link.title}</a>
			{/each}
		</div></svelte:fragment
	>
</AppBar>
