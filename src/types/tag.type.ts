import { DataWithPage } from './dataWithPage.type';

export interface ITag {
	_id: string;
	name: string;
	visitAllNumber?: number;
	createDate?: Date;
	updateDate?: Date;
	isDeleted?: boolean;
}

export type ITagWithPage = DataWithPage<ITag>;
