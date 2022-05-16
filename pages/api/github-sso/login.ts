import type { NextApiRequest, NextApiResponse } from 'next';
import Fetch from 'httpHelper';
import { IArticle } from 'types/articles.type';

const handler = async (req: NextApiRequest, res: NextApiResponse<IArticle>) => {
	return res.redirect(`${process.env.BASE_URL}/github-sso/login`);
};

export default handler;
