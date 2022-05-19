// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Fetch from '../../../httpHelper';
import { IArticlesWithPage } from '../../../types/articles.type';
import { ObjectToString } from '../../../utils/objToStr';

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<IArticlesWithPage>
) => {
	const { pageSize, pageNum } = req.body;
	// console.log(ObjectToString(req.cookies));
	const response = await Fetch.post(
		'/blog/getBlogsByPage',
		{
			pageSize,
			pageNum
		},
		{
			headers: {
				...(req.headers as HeadersInit),
				'Content-Type': 'application/json'
			}
		}
	);
	return res.status(response.status).json(await response.json());
};

export default handler;
