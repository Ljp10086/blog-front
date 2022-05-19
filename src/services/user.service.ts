import webFetch from '../httpHelper/webFetch';
import { IUserInfo } from '../types/user.type';

export const getUserInfo = async (): Promise<IUserInfo> => {
	const res = await webFetch.get('/api/user/getUserinfo');
	return res.json();
};
