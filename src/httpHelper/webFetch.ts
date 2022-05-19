class WebFetch {
	constructor() {}

	async request(input: RequestInfo | URL, init?: RequestInit) {
		const res = await fetch(`${input}`, init);
		if (!res.ok) {
			return Promise.reject(res);
		}
		return res;
	}

	async get(input: RequestInfo | URL, init?: RequestInit) {
		return this.request(input, {
			method: 'GET',
			...init
		});
	}

	async post(
		input: RequestInfo | URL,
		body?: RequestInit | { [k: string]: number | string | boolean | null },
		init?: Omit<RequestInit, 'body' | 'method'>
	) {
		let reqBody = body
			? typeof body === 'string'
				? body
				: JSON.stringify(body)
			: '';
		return this.request(input, {
			method: 'POST',
			body: reqBody,
			...init
		});
	}

	async delete(input: RequestInfo | URL, init?: RequestInit) {
		return this.request(input, {
			method: 'DELETE',
			...init
		});
	}
}

export default new WebFetch();
