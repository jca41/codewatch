<script>
	import '../styles/theme.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import Navigation from '$lib/components/navigation.svelte';
	import Error from '$lib/components/error.svelte';

	const queryClient = new QueryClient();
	export let data;
</script>

<QueryClientProvider client={queryClient}>
	<AppShell regionPage="py-14 px-8">
		<svelte:fragment slot="header">
			<Navigation />
		</svelte:fragment>
		{#if data.error}
			<Error />
		{:else}
			<slot />
		{/if}
	</AppShell>
</QueryClientProvider>
