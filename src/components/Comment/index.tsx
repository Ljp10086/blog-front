import classNames from 'classnames';
import React from 'react';
import { ICategory } from '../../types/category.type';
import styles from './index.module.scss';
import Image from 'next/image';
import { IComment } from 'src/types/comment.type';
import ReplayTextField from '../ReplayTextField';
import { commentService } from 'src/services';

interface ICommentProps {
	comment: IComment;
	replay?: IComment | null;
	children?: React.ReactNode;
	onClickReply?: Function;
}

const Comment: React.FC<ICommentProps> = (props) => {
	const { replay, children, comment, onClickReply } = props;

	return (
		<div className={styles['container']}>
			<div className={styles['left']}>
				<div className={styles['avatar']}>
					<Image
						height={40}
						width={40}
						layout="responsive"
						src={comment?.user?.avatarUrl ?? '/images/default.webp'}
						alt={comment?.user?.avatarUrl}
					></Image>
				</div>
			</div>
			<div className={styles['right']}>
				<p className={styles['title']}>
					{!!replay && (
						<React.Fragment>
							<span>{replay?.user?.name}</span>
							<span className={styles['replay']}>回复</span>
						</React.Fragment>
					)}
					{comment?.user?.name}
				</p>
				<p className={styles['content']}>{comment.content}</p>
				<span onClick={() => onClickReply?.()} className={styles['reply']}>
					回复
				</span>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default React.memo(Comment);
