import type { Action } from 'svelte/action';
import ApexCharts from 'apexcharts';

export const chart = ((node, options) => {
	const chart = new ApexCharts(node, options);
	chart.render();

	return {
		update(newOptions) {
			chart.updateOptions(newOptions);
		},
		destroy() {
			chart.destroy();
		}
	};
}) satisfies Action<HTMLElement, Record<string, unknown>, { seriesClick?: () => void }>;
