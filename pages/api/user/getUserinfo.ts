import type { NextApiRequest, NextApiResponse } from 'next';
import Fetch from 'httpHelper';
import { IArticle } from 'types/articles.type';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const headers = req.headers;
	const response = await Fetch.get(`/github-sso/getUserInfo`, {
		headers: headers as HeadersInit
	});
	return res.status(response.status).json(await response.json());
};

export default handler;
