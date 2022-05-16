// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Fetch from 'httpHelper';
import { IBlogLike } from 'types/like.type';
import Like from 'types/like.enum';
import { ObjectToString } from 'utils/objToStr';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { blogId, userId, isLike } = req.body as IBlogLike;
	const cookie = req.cookies;
	const response = await Fetch.post(
		`/blog/like`,
		{
			blogId,
			userId,
			isLike: isLike ?? Like.Dislike
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
