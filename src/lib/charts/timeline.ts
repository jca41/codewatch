import type { CodingData, Event, WindowData } from '$lib/contracts/aw';
import { BASE_CONFIG } from './base';
import { formatDuration } from '$lib/utils/datetime';

import merge from 'deepmerge';

export const TIMELINE_CONFIG = merge(BASE_CONFIG, {
	chart: {
		type: 'area',
		height: 300
	},
	xaxis: {
		type: 'datetime'
	},
	yaxis: {
		type: 'numeric',
		labels: {
			formatter(v: number) {
				return formatDuration(v);
			}
		},
		tickAmount: 4
	},
	dataLabels: {
		enabled: false
	},
	fill: {
		type: 'gradient'
	},
	stroke: {
		width: 3
	}
});

type TimelineFormatter<D extends Record<string, string>> = (
	data: Event<D>[]
) => { x: number; y: number }[];

export const formatTimeline = ((data = []) => {
	return data.map((d) => {
		return {
			x: new Date(d.timestamp).getTime(),
			y: d.duration
		};
	});
}) satisfies TimelineFormatter<CodingData | WindowData>;
