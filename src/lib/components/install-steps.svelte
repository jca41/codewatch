<script lang="ts">
	const AW_URL = 'https://activitywatch.net/';
</script>

<ul class="space-y-3 list-disc ml-8 typography">
	<li>
		Install <a href={AW_URL}>ActivityWatch</a>. Check out their homepage for instructions. Make sure
		the server is running.
	</li>
	<li>
		Install the extension for Visual Studio Code, <a
			href="https://marketplace.visualstudio.com/items?itemName=activitywatch.aw-watcher-vscode"
			>here</a
		>.
	</li>
	<li>
		Add an entry to the CORS configuration so the application can communicate with <code
			>aw-server</code
		>. <br /> Edit <code>~/Library/Application\ Support/activitywatch/aw-server.toml</code> (<a
			href="https://docs.activitywatch.net/en/latest/directories.html#config-directory"
			>Config docs</a
		>) and add <code>cors_origins = "tauri://localhost"</code> to the <code>[server]</code>
		section.
	</li>
</ul>

<style>
	.typography *:not(h1, h2) {
		@apply text-lg sm:text-xl;
	}
	.typography code {
		@apply text-sm sm:text-base;
	}
</style>
