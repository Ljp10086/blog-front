import type { NextApiRequest, NextApiResponse } from 'next';
import Fetch from 'httpHelper';
import { IArticle } from 'types/articles.type';

const buildQueryString = (query: { [key: string]: string | string[] }) => {
	return Object.keys(query)
		.map((key) => `${key}=${query[key]}`)
		.join('&');
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query, headers } = req;
	const queryStr = buildQueryString(query);
	const response = await Fetch.get(`/github-sso/callback?${queryStr}`, {
		headers: headers as HeadersInit,
		credentials: 'include',
		redirect: 'manual'
	});
	const location = response.headers.get('location');
	const cookie = response.headers.get('set-cookie');
	if (!cookie || !location) {
		return res.send('发生错误');
	}
	return res
		.status(302)
		.setHeader('location', location)
		.setHeader('set-cookie', cookie)
		.send('');
};

export default handler;
