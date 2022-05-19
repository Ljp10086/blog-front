import { DataWithPage } from './dataWithPage.type';

export interface ICategory {
	_id: string;
	name: string;
	hot?: number;
	count?: number;
	coverPic?: string;
	createDate?: Date;
	updateDate?: Date;
	isDeleted?: boolean;
}

export type ICategoryWithPage = DataWithPage<ICategory>;
