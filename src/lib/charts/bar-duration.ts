import type { CodingData, Event } from '$lib/contracts/aw';
import { formatDuration } from '$lib/utils/datetime';
import { BASE_CONFIG } from './base';
import merge from 'deepmerge';

export const BAR_DURATION_CONFIG = merge(BASE_CONFIG, {
	chart: {
		type: 'bar',
		height: 500
	},
	// fill: {
	// 	type: 'gradient'
	// },
	plotOptions: {
		bar: {
			horizontal: true
		}
	},
	dataLabels: {
		formatter(v: number) {
			return formatDuration(v);
		}
	},
	tooltip: {
		y: {
			formatter(v: number) {
				return formatDuration(v);
			}
		}
	},
	xaxis: {
		labels: {
			show: false
		},
		axisTicks: {
			show: false
		}
	}
});

type BarDurationFormatter<D extends Record<string, string>> = (
	data: Event<D>[]
) => { x: string; y: number }[];

function lastPathSegment(path: string) {
	const segment = path.split('/').at(-1);

	return segment || path;
}

export const formatProjects = ((data = []) => {
	return data.map((d) => {
		return {
			x: lastPathSegment(d.data.project),
			y: d.duration
		};
	});
}) satisfies BarDurationFormatter<CodingData>;

export const formatFiles = ((data = []) => {
	return data.map((d) => {
		return {
			x: lastPathSegment(d.data.file),
			y: d.duration
		};
	});
}) satisfies BarDurationFormatter<CodingData>;

export const formatLanguages = ((data = []) => {
	return data.map((d) => ({
		x: d.data.language,
		y: d.duration
	}));
}) satisfies BarDurationFormatter<CodingData>;
