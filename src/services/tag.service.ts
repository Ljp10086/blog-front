import webFetch from '../httpHelper/webFetch';
import { PageType } from '../types';

export const getTagsByPage = async (data: PageType) => {
	return webFetch.post('/api/tag/getTagsByPage', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
