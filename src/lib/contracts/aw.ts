export type Event<D extends Record<string, string>> = {
	data: D;
	duration: number;
	timestamp: string;
};

export type WindowData = { app: string; title: string };
export type CodingData = { language: string; project: string; file: string };
