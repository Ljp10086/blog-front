// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Fetch from 'httpHelper';
import { IArticle } from 'types/articles.type';
import { ObjectToString } from 'utils/objToStr';

const handler = async (req: NextApiRequest, res: NextApiResponse<IArticle>) => {
	const { pageSize, pageNum } = req.body;
	const cookie = req.cookies;
	const response = await Fetch.post(
		`/blog/getBlogById/${req.body.id}`,
		{
			pageSize,
			pageNum
		},
		{
			headers: {
				Cookie: ObjectToString(cookie),
				'Content-Type': 'application/json'
			}
		}
	);
	return res.status(response.status).json(await response.json());
};

export default handler;
