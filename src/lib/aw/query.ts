export class Query {
	#query = '';

	#variable(name: string, expression: string) {
		return `${name}=${expression};`;
	}

	#bucket(bucket: string) {
		return `flood(query_bucket("${bucket}"))`;
	}

	#joinBucketsRecursive(buckets: string[]): string {
		switch (buckets.length) {
			case 0:
				return '';
			case 1:
				return this.#bucket(buckets[0]);
			default:
				return `union_no_overlap(${this.#bucket(buckets[0])},${this.#joinBucketsRecursive(
					buckets.slice(1)
				)})`;
		}
	}

	// Public API

	bucket(bucket: string) {
		this.#query = this.#bucket(bucket);
		return this;
	}

	joinBuckets(buckets: string[]) {
		this.#query = this.#joinBucketsRecursive(buckets);
		return this;
	}

	mergeEventsByKeys(keys: string[]) {
		this.#query = `merge_events_by_keys(${this.#query}, ${JSON.stringify(keys)})`;
		return this;
	}

	sortBy(type: 'duration' | 'timestamp') {
		this.#query = `sort_by_${type}(${this.#query})`;
		return this;
	}

	return() {
		return `RETURN=${this.#query};`;
	}
}

// export function joinBuckets(buckets: string[]): string {
// 	switch (buckets.length) {
// 		case 0:
// 			return '';
// 		case 1:
// 			return queryBucket(buckets[0]);
// 		default:
// 			return `union_no_overlap(${queryBucket(buckets[0])},${joinBuckets(buckets.slice(1))})`;
// 	}

// 	// return buckets.reduce((acc, curr, i, arr) => {
// 	// 	if (i === arr.length - 1) {
// 	// 		return `${acc} /n ${id}=join-agg-${i - 1};`;
// 	// 	}

// 	// 	const first = i === 0 ? queryBucket(curr) : `join-agg-${i - 1}`;

// 	// 	return `${acc}
// 	// 	join-agg-${i}=union_no_overlap(${first}, ${queryBucket(arr[i + 1])});`;
// 	// }, '');
// }
