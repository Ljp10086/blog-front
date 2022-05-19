export const ObjectToString = (query: { [key: string]: string | string[] }) => {
	return Object.keys(query)
		.map((key) => `${key}=${query[key]}`)
		.join('&');
};
