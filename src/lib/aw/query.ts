import type { AWClient } from 'aw-client';
import { awClient } from './client';
import type { Event } from '$lib/contracts/aw';

export class Query<D extends Record<string, string> = Record<string, string>> {
	#debug = false;
	#query = '';
	#tempVariables: string[] = [];

	client: AWClient;

	static BUCKETS = {
		afk: 'aw-watcher-afk_',
		window: 'aw-watcher-window_',
		vscode: 'aw-watcher-vscode_'
	} as const;

	constructor(client: AWClient = awClient, { debug = false } = {}) {
		this.client = client;
		this.#debug = debug;
	}

	#variable(statement: string) {
		const varName = `temp${(Math.random() * 1000).toFixed()}`;
		const constructed = `${varName}=${statement};`;
		this.#tempVariables.push(constructed);

		return varName;
	}

	#return() {
		return `RETURN=${this.#query};`;
	}

	#flood(events: string) {
		return `flood(${events})`;
	}

	#findBucket(bucket: string) {
		return this.#flood(`query_bucket(find_bucket("${bucket}"))`);
	}

	#bucket(bucket: string) {
		return this.#flood(`query_bucket("${bucket}")`);
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

	getTempVariables() {
		return this.#tempVariables;
	}

	raw() {
		return this.#query;
	}

	findBucket(bucket: string) {
		this.#query = this.#findBucket(bucket);
		return this;
	}

	bucket(bucket: string): this {
		this.#query = this.#bucket(bucket);
		return this;
	}

	joinBuckets(buckets: string[]): this {
		this.#query = this.#joinBucketsRecursive(buckets);
		return this;
	}

	filterKeyValues(key: keyof D, values: string[]): this {
		const queryVar = this.#variable(this.#query);
		const filterVar = this.#variable(
			`filter_keyvals(${queryVar}, "${key as string}", ${JSON.stringify(values)})`
		);
		this.#query = filterVar;
		return this;
	}

	filterEmptyValues(key: keyof D): this {
		return this.excludeKeyValues(key, ['']);
	}

	excludeKeyValues(key: keyof D, values: string[]): this {
		const queryVar = this.#variable(this.#query);
		const filterVar = this.#variable(
			`exclude_keyvals(${queryVar}, "${key as string}", ${JSON.stringify(values)})`
		);
		this.#query = filterVar;
		return this;
	}

	filterPeriodIntersect(query: Query): this {
		this.#tempVariables.push(...query.getTempVariables());

		this.#query = `filter_period_intersect(${this.#query},${query.raw()})`;
		return this;
	}

	noAFK(): this {
		const afk = new Query().findBucket(Query.BUCKETS.afk).filterKeyValues('status', ['not-afk']);

		return this.filterPeriodIntersect(afk);
	}

	mergeEventsByKeys(keys: (keyof D)[]): this {
		const queryVar = this.#variable(this.#query);

		this.#query = `merge_events_by_keys(${queryVar}, ${JSON.stringify(keys)})`;
		return this;
	}

	chunkEventsByKey(key: keyof D): this {
		this.#query = `chunk_events_by_key(${this.#query}, "${key as string}")`;
		return this;
	}

	sortBy(type: 'duration' | 'timestamp'): this {
		this.#query = `sort_by_${type}(${this.#query})`;
		return this;
	}
	sumDurations(): this {
		this.#query = `sum_durations(${this.#query})`;
		return this;
	}

	limit(count: number) {
		this.#query = `limit_events(${this.#query},${count})`;
		return this;
	}

	async execute(start: string, end?: string) {
		const statement = this.#tempVariables.concat(this.#return()).join('');

		if (this.#debug) {
			console.log('Query>>>> ', statement);
		}

		const [result] = await this.client.query(
			[{ start: new Date(start), end: end ? new Date(end) : new Date() }],
			[statement]
		);

		return result as Event<D>[];
	}
}
