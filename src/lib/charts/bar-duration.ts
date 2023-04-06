import type { CodingData, Event } from '$lib/contracts/aw';
import { formatDuration } from '$lib/utils/datetime';
import { BASE_CONFIG } from './base';
import merge from 'deepmerge';

export const BAR_DURATION_CONFIG = merge(BASE_CONFIG, {
	chart: {
		type: 'bar'
	},
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
		type: 'numeric',
		labels: {
			formatter(v: number) {
				return formatDuration(v);
			}
		}
	}
});

type BarDurationFormatter<D extends Record<string, string>> = (
	data: Event<D>[]
) => { x: string; y: number }[];

export const formatProjects = ((data) => {
	return data.map((d) => ({
		x: d.data.project,
		y: d.duration
	}));
}) satisfies BarDurationFormatter<CodingData>;

export const formatLanguages = ((data) => {
	return data.map((d) => ({
		x: d.data.language,
		y: d.duration
	}));
}) satisfies BarDurationFormatter<CodingData>;

export function createBarDuration<D extends Record<string, string>>({
	name,
	data = [],
	formatter
}: {
	name: string;
	data?: Event<D>[];
	formatter: BarDurationFormatter<D>;
}) {
	return {
		...BAR_DURATION_CONFIG,
		series: [
			{
				name,
				data: formatter(data)
			}
		]
	};
}
