import { DataWithPage } from './dataWithPage.type';
import { IUserInfo } from './user.type';

export interface IComment {
	_id?: string;
	content: string;
	user?: IUserInfo;
	children?: IComment[];
	blogId: string;
	pid?: string;
	isUpdated?: boolean;
	isDeleted?: boolean;
	likeCount?: number;
	createDate?: Date;
	updateDate?: Date;
}

export type ICommentsWithPage = DataWithPage<IComment>;
