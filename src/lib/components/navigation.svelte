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
		</div>
		<a href="/info" class=" hover:scale-110 transition-transform"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				class="w-8 h-8 stroke-primary-400"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
				/>
			</svg>
		</a>
	</svelte:fragment>
</AppBar>
