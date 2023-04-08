import type { AWClient } from 'aw-client';
import { writable } from 'svelte/store';
import { toDatetimeInputString } from './utils/datetime';
import { subDays } from 'date-fns';
export const bucketsStore = writable<Awaited<ReturnType<AWClient['getBuckets']>>>({});

export const startDateStore = writable<string>(toDatetimeInputString(subDays(new Date(), 5)));
export const endDateStore = writable<string>(toDatetimeInputString(new Date()));
