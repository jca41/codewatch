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

// type GroupedEvents<D extends Record<string, string>> = Record<string, Event<D>[]>;

// function groupEventsByKey<D extends Record<string, string>>(
// 	data: Event<D>[],
// 	key: keyof D
// ): GroupedEvents<D> {
// 	return data.reduce((acc, curr) => {
// 		const value = curr.data[key];

// 		return { ...acc, [value]: (acc[value] ?? []).concat(curr) };
// 	}, {} as GroupedEvents<D>);
// }

// type TimelineFormatter<D extends Record<string, string>> = (
// 	data: Event<D>[],
// 	type: string
// ) => { y: [number, number]; x: string }[];

// export const formatCodingEvents = ((data = [], type) => {
// 	return data.map((d) => {
// 		return {
// 			x: type,
// 			y: [
// 				new Date(d.timestamp).getTime(),
// 				add(new Date(d.timestamp), { seconds: d.duration }).getTime()
// 			]
// 		};
// 	});
// }) satisfies TimelineFormatter<CodingData>;

// const FORMATTERS: Partial<Record<keyof CodingData, (d: string) => string>> = {
// 	project: lastPathSegment,
// 	file: lastPathSegment
// };

// export function createCodingTimelineSeries(data: Event<CodingData>[] = [], type: keyof CodingData) {
// 	const groupedEvents = groupEventsByKey(data, type);

// 	const returnedData = Object.keys(groupedEvents).map((groupKey) => {
// 		return {
// 			name: FORMATTERS?.[type]?.(groupKey) ?? groupKey,
// 			data: formatCodingEvents(groupedEvents[groupKey], type)
// 		};
// 	});

// 	return returnedData;
// }

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
