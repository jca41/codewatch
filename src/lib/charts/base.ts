export const THEME_COLORS = {
	300: '#f5e9ad',
	500: '#e6c833',
	600: '#cfb42e'
};

export const BASE_CONFIG = {
	theme: {
		mode: 'dark',
		monochrome: {
			enabled: true,
			color: THEME_COLORS[500]
		}
	},
	chart: {
		background: 'transparent',
		zoom: { enabled: false },
		toolbar: {
			tools: {
				download: false,
				selection: false,
				zoom: false,
				zoomin: false,
				zoomout: false,
				pan: false
			}
		}
	}
};
