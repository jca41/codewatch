import type { AWClient } from 'aw-client';
import { writable } from 'svelte/store';

export const bucketsStore = writable<Awaited<ReturnType<AWClient['getBuckets']>>>({});

export const datePickerStore = writable<{ start: string; end: string }>({ start: '', end: '' });
