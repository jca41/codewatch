import { formatISO } from 'date-fns';

export function formatDuration(d: number, { skipSeconds = false } = {}) {
	const h = Math.floor(d / 3600);
	const hDisplay = h > 0 ? `${h}h` : '';

	const m = Math.floor((d % 3600) / 60);
	const mDisplay = m > 0 ? `${m}m` : '';

	const s = Math.floor((d % 3600) % 60);
	const sDisplay = s > 0 ? `${s}s` : '';

	const fallback = skipSeconds ? '<1m' : '';
	const formatted = skipSeconds ? hDisplay + mDisplay : hDisplay + mDisplay + sDisplay;

	return formatted || fallback;
}

export function toDatetimeInputString(date: Date) {
	return formatISO(date).split('+')[0];
}

export function sumDurations<D extends Record<string, string | number>>(
	data: D[] = [],
	key: keyof D
) {
	return data.reduce((acc, curr) => {
		return acc + (curr[key] as number);
	}, 0);
}
