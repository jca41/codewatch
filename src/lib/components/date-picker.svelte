<script lang="ts">
	import { endDateStore, startDateStore, datesStore, type RelativeDatesId } from '$lib/stores';
	import { toDatetimeInputString } from '$lib/utils/datetime';
	import { sub, type Duration } from 'date-fns';

	const SELECT_OPTIONS: { id: RelativeDatesId; label: string; duration: Duration }[] = [
		{ id: '1d', label: 'day', duration: { days: 1 } },
		{ id: '3d', label: '3 days', duration: { days: 3 } },
		{ id: '1w', label: 'week', duration: { weeks: 1 } },
		{ id: '2w', label: '2 weeks', duration: { weeks: 2 } },
		{ id: '1m', label: 'month', duration: { months: 1 } },
		{ id: '6m', label: '6 months', duration: { months: 6 } },
		{ id: '1y', label: 'year', duration: { years: 1 } }
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
	<div class="flex input-group">
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
