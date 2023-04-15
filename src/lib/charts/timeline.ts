import type { CodingData, Event } from '$lib/contracts/aw';
import { lastPathSegment } from '$lib/utils/string';
import { BASE_CONFIG } from './base';
import merge from 'deepmerge';
import { add } from 'date-fns';
export const TIMELINE_CONFIG = merge(BASE_CONFIG, {
	theme: {
		mode: 'dark',
		monochrome: {
			enabled: false
		}
	},
	chart: {
		type: 'rangeBar',
		height: 200,
		animations: {
			enabled: false
		}
	},
	plotOptions: {
		bar: {
			horizontal: true,
			rangeBarGroupRows: true
		}
	},
	xaxis: {
		type: 'datetime'
	}
	// legend: {
	// 	position: 'top',
	// 	horizontalAlign: 'left'
	// }
});

type GroupedEvents<D extends Record<string, string>> = Record<string, Event<D>[]>;

function groupEventsByKey<D extends Record<string, string>>(
	data: Event<D>[],
	key: keyof D
): GroupedEvents<D> {
	return data.reduce((acc, curr) => {
		const value = curr.data[key];

		return { ...acc, [value]: (acc[value] ?? []).concat(curr) };
	}, {} as GroupedEvents<D>);
}

type TimelineFormatter<D extends Record<string, string>> = (
	data: Event<D>[],
	type: string
) => { y: [number, number]; x: string }[];

export const formatCodingEvents = ((data = [], type) => {
	return data.map((d) => {
		return {
			x: type,
			y: [
				new Date(d.timestamp).getTime(),
				add(new Date(d.timestamp), { seconds: d.duration }).getTime()
			]
		};
	});
}) satisfies TimelineFormatter<CodingData>;

const FORMATTERS: Partial<Record<keyof CodingData, (d: string) => string>> = {
	project: lastPathSegment,
	file: lastPathSegment
};

export function createCodingTimelineSeries(data: Event<CodingData>[] = [], type: keyof CodingData) {
	const groupedEvents = groupEventsByKey(data, type);

	const returnedData = Object.keys(groupedEvents).map((groupKey) => {
		return {
			name: FORMATTERS?.[type]?.(groupKey) ?? groupKey,
			data: formatCodingEvents(groupedEvents[groupKey], type)
		};
	});

	return returnedData;
}
