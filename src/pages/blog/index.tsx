import CategoryCard from '../../components/CategoryCard';
import Pagination from '../../components/Pagination';
import MainLayout from '../../layouts/Main';
import React, { useEffect } from 'react';
import { articlesService, categoryService } from '../../services';
import { ICategoryWithPage } from '../../types/category.type';
import { useImmer } from 'use-immer';
import styles from './index.module.scss';
import { IArticle, IArticlesWithPage } from 'src/types/articles.type';
import ArticleCard from 'src/components/ArticleCard';
import Like from 'src/types/like.enum';
import { useAppSelector } from 'src/features/hooks';
import Breadcrumbs from 'src/components/Breadcrumbs';

const Blog = () => {
	const [pageNum, setPageNum] = useImmer(1);
	const userInfo = useAppSelector((state) => state.user.data);
	const [articleWithTotal, setArticleWithTotal] =
		useImmer<null | IArticlesWithPage>(null);

	useEffect(() => {
		getCategoryByPage();
	}, []);

	useEffect(() => {
		getCategoryByPage();
	}, [pageNum]);

	const getCategoryByPage = async () => {
		const res = await articlesService.getArticlesByPage({
			pageNum,
			pageSize: 5
		});
		const resBody = await res.json();
		setArticleWithTotal(resBody);
	};

	// * 点赞
	const handleClickLikeIcon = async (id: string, article: IArticle) => {
		if (userInfo) {
			const isLike = article.isUserLike ? Like.Dislike : Like.Like;
			await articlesService.changeBlogLike({
				userId: userInfo._id!,
				blogId: id,
				isLike
			});
			setArticleWithTotal((draft) => {
				const isUserLike = isLike === Like.Like;
				const likedArticle = draft?.list.find((item) => item._id === id);
				likedArticle!.isUserLike = isUserLike;
				likedArticle!.likeCount! += isUserLike ? 1 : -1;
			});
		}
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
							label: '文章',
							link: '/blog'
						}
					]}
				></Breadcrumbs>
				<div className={styles['articles']}>
					{articleWithTotal?.list.map((article) => (
						<ArticleCard
							onClickLikeIcon={(id) => handleClickLikeIcon(id, article)}
							key={article._id}
							article={article}
						/>
					))}
				</div>
				<Pagination
					onChange={(current: number) => {
						setPageNum(current);
					}}
					currentPage={pageNum}
					total={articleWithTotal?.total ?? 0}
				></Pagination>
			</div>
		</MainLayout>
	);
};

export default Blog;
