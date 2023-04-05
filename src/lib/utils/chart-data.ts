export function createBarSeries(data: unknown[]) {
	return data.map((d) => ({
		x: d.data!.app,
		y: d.duration
	}));
}

export function formatDuration(d: number, { skipSeconds = false } = {}) {
	const h = Math.floor(d / 3600);
	const hDisplay = h > 0 ? `${h}h` : '';

	const m = Math.floor((d % 3600) / 60);
	const mDisplay = m > 0 ? `${m}m` : '';

	const s = Math.floor((d % 3600) % 60);
	const sDisplay = s > 0 ? `${s}s` : '';

	return skipSeconds ? hDisplay + mDisplay : hDisplay + mDisplay + sDisplay;
}
