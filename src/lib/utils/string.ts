export function lastPathSegment(path: string) {
	const segment = path.split('/').at(-1);

	return segment || path;
}
