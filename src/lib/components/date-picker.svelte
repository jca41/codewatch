<script lang="ts">
	import { endDateStore, startDateStore, datesStore } from '$lib/stores';
	import { toDatetimeInputString } from '$lib/utils/datetime';
	import { sub, type Duration } from 'date-fns';

	type OptionIds = '1d' | '1w' | '1m' | '6m';
	const SELECT_OPTIONS: { id: OptionIds; label: string; duration: Duration }[] = [
		{ id: '1d', label: '24h', duration: { days: 1 } },
		{ id: '1w', label: 'week', duration: { weeks: 1 } },
		{ id: '1m', label: 'month', duration: { months: 1 } },
		{ id: '6m', label: '6 months', duration: { months: 6 } }
	];

	function onSelectChange(value: string) {
		const found = SELECT_OPTIONS.find((o) => o.id === value);

		if (!found) return;

		const now = new Date();

		datesStore.set({
			start: toDatetimeInputString(sub(now, found.duration)),
			end: toDatetimeInputString(now),
			relative: found.id
		});
	}

	function onDateChange() {
		$datesStore.relative = undefined;
	}
</script>

<div class="gap-6 inline-grid sm:grid-cols-[auto_1fr]">
	<div class="flex input-group input-group-divider">
		<div class="input-group-shim">Last</div>
		<select
			class="select"
			value={$datesStore.relative}
			on:change={(e) => onSelectChange(e.currentTarget.value)}
		>
			{#each SELECT_OPTIONS as option}
				<option value={option.id}>{option.label}</option>
			{/each}
		</select>
	</div>
	<div class="flex input-group input-group-divider">
		<input
			class="input"
			type="datetime-local"
			max={$endDateStore}
			title="Start date"
			bind:value={$datesStore.start}
			on:input={onDateChange}
		/>
		<input
			class="input"
			type="datetime-local"
			min={$startDateStore}
			title="End date"
			bind:value={$datesStore.end}
			on:input={onDateChange}
		/>
	</div>
</div>
