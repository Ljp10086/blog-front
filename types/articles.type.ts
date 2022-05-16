import { DataWithPage } from './dataWithPage.type';

export interface IArticle {
	_id?: string;
	title: string;
	describe: string;
	tags?: string[];
	category?: string[];
	isPrivate?: boolean;
	contentMd: string;
	visitAllNumber?: number;
	coverPic?: string;
	likeCount?: number;
	commentCount?: number;
	creator: number;
	isDeleted?: boolean;
	isUserLike?: boolean;
	createDate?: Date;
	updateDate?: Date;
}

export type IArticlesWithPage = DataWithPage<IArticle>;
