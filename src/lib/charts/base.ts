export const THEME_COLORS = {
	500: '#bd5656'
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
