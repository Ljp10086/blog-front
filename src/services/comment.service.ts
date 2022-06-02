import { IComment } from 'src/types/comment.type';
import webFetch from '../httpHelper/webFetch';
import { PageType } from '../types';

export const getCommentByPage = async (data: PageType) => {
	return webFetch.post('/api/comment/getCommentsByPage', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

export const create = async (data: IComment) => {
	return webFetch.post('/api/comment/create', data as any, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
