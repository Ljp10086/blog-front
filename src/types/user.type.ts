import { Role } from './role.enum';

export interface IUserInfo {
	_id?: string;
	role?: Role;
	userId: number;
	login: string;
	name: string;
	email?: string;
	avatarUrl?: string;
	createDate: Date;
	updateDate: Date;
	isDeleted?: boolean;
}
