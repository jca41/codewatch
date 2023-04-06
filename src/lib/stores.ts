import type { AWClient } from 'aw-client';
import { writable } from 'svelte/store';
import { toDatetimeInputString } from './utils/datetime';

export const bucketsStore = writable<Awaited<ReturnType<AWClient['getBuckets']>>>({});

export const startDateStore = writable<string>();
export const endDateStore = writable<string>(toDatetimeInputString(new Date()));
