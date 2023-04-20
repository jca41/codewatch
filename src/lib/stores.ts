import type { AWClient } from 'aw-client';
import { writable } from 'svelte/store';
import { toDatetimeInputString } from './utils/datetime';
import { subDays } from 'date-fns';

export const bucketsStore = writable<Awaited<ReturnType<AWClient['getBuckets']>>>({});

export type RelativeDatesId = '1d' | '3d' | '1w' | '2w' | '1m' | '6m' | '1y';

export const datesStore = writable<{
	start: string;
	end: string;
	relative?: RelativeDatesId;
}>({
	start: toDatetimeInputString(subDays(new Date(), 1)),
	end: toDatetimeInputString(new Date()),
	relative: '1d'
});
