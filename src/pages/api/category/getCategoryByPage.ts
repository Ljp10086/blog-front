import type { NextApiRequest, NextApiResponse } from 'next';
import Fetch from '../../../httpHelper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const headers = req.headers;
	const body = req.body;
	const response = await Fetch.post(`/category/getCategoryByPage`, body, {
		headers: headers as HeadersInit
	});
	return res.status(response.status).json(await response.json());
};

export default handler;
