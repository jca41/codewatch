import type { AWClient } from 'aw-client';
import { writable } from 'svelte/store';

export const bucketsStore = writable<Awaited<ReturnType<AWClient['getBuckets']>>>({});
