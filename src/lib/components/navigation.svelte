<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	const LINKS = [
		{ title: 'Coding', path: '/' },
		{ title: 'Productivity', path: '/productivity' }
	];
</script>

<AppBar>
	<svelte:fragment slot="lead"
		><span class="text-2xl font-bold whitespace-nowrap">{'<CodeWatch />'}</span></svelte:fragment
	>
	<svelte:fragment slot="trail"
		><div class="btn-group variant-soft">
			{#each LINKS as link}
				<a href={link.path}>{link.title}</a>
			{/each}
		</div></svelte:fragment
	>
</AppBar>
