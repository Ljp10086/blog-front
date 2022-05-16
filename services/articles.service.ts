import webFetch from 'httpHelper/webFetch';
import { PageType } from 'types';
import { IBlogLike } from 'types/like.type';

export const getArticlesByPage = async (data: PageType) => {
	return webFetch.post('/api/articles/getArticlesByPage', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

export const changeBlogLike = async (data: IBlogLike) => {
	return webFetch.post('/api/articles/changeBlogLike', data as any, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

export const upVisit = async (blogId: string) => {
	return webFetch.post(
		'/api/articles/upVisit',
		{ blogId },
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
};
