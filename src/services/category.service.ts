import webFetch from '../httpHelper/webFetch';
import { PageType } from '../types';
import { ICategoryWithPage } from '../types/category.type';

export const getCategoryByPage = async (data: PageType) => {
	return webFetch.post('/api/category/getCategoryByPage', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
