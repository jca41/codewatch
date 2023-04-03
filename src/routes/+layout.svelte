<script>
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell regionPage="py-14 px-8">
	<svelte:fragment slot="header">
		<AppBar>
			<span class="text-3xl font-bold">CodeWatch</span>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
