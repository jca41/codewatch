<script lang="ts">
	export let data;
</script>

{#await data.promises.a}
	Loading
{:then message}
	<div>{message}</div>
{/await}
