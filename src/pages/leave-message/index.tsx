import MainLayout from '../../layouts/Main';
import React, { useEffect } from 'react';
import Breadcrumbs from 'src/components/Breadcrumbs';
import Comment from 'src/components/Comment';
import styles from './index.module.scss';
import { useImmer } from 'use-immer';
import { IComment, ICommentsWithPage } from 'src/types/comment.type';
import { commentService } from 'src/services';
import ReplayTextField from 'src/components/ReplayTextField';
import { useAppSelector } from 'src/features/hooks';
import Pagination from 'src/components/Pagination';

const LeaveMessage = () => {
	const [pageNum, setPageNum] = useImmer(1);
	const [pageSize, setPageSize] = useImmer(5);
	const [replyIndex, setReplyIndex] = useImmer(-1);
	const [currentComment, setCurrentComment] = useImmer<IComment | null>(null);

	const userInfo = useAppSelector((state) => state.user.data);

	const [commentsWithPage, setCommentsWithPage] =
		useImmer<null | ICommentsWithPage>(null);

	useEffect(() => {
		getCommentsByPage();
	}, [pageNum, pageSize]);

	const getCommentsByPage = async () => {
		const res = await commentService.getCommentByPage({
			pageNum,
			pageSize
		});
		setCommentsWithPage(await res.json());
	};

	const buildCommentWidget = (comments?: IComment[], replay?: IComment) => {
		return comments?.map((comment, index) => (
			<Comment
				onClickReply={() => {
					console.log(currentComment, comment);
					setCurrentComment(comment);
				}}
				replay={replay}
				key={comment._id}
				comment={comment}
			>
				{currentComment?._id === comment._id && (
					<ReplayTextField
						onCancel={() => setCurrentComment(null)}
						onConfirm={async (v: string) => {
							await commentService.create({
								content: v,
								user: userInfo?._id as any,
								blogId: 'comment',
								pid: comment?._id
							});
							await getCommentsByPage();
							setCurrentComment(null);
						}}
					></ReplayTextField>
				)}
				{comment.children?.length !== 0 &&
					buildCommentWidget(comment.children, comment)}
			</Comment>
		));
	};

	return (
		<MainLayout>
			<div className={styles['container']}>
				<Breadcrumbs
					breadcrumbItems={[
						{
							label: '首页',
							link: '/'
						},
						{
							label: '留言',
							link: '/blog'
						}
					]}
				></Breadcrumbs>
				<div>
					<ReplayTextField
						onConfirm={async (v: string) => {
							await commentService.create({
								content: v,
								user: userInfo?._id as any,
								blogId: 'comment'
							});
							getCommentsByPage();
						}}
					></ReplayTextField>
				</div>
				<div>
					<div>{buildCommentWidget(commentsWithPage?.list ?? [])}</div>
				</div>
				<Pagination
					onChange={(current: number) => {
						setPageNum(current);
					}}
					pageSize={pageSize}
					currentPage={pageNum}
					total={commentsWithPage?.total ?? 0}
				></Pagination>
			</div>
		</MainLayout>
	);
};

export default LeaveMessage;
