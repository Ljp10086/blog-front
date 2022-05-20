import classNames from 'classnames';
import ArticleCard from 'src/components/ArticleCard';
import Divider from 'src/components/Divider';
import SectionTitle from 'src/components/SectionTitle';
import { useAppSelector } from '../features/hooks';
import MainLayout from '../layouts/Main';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { articlesService } from '../services';
import { IArticle, IArticlesWithPage } from '../types/articles.type';
import Like from '../types/like.enum';
import { useImmer } from 'use-immer';
import styles from './index.module.scss';

const PAGE_SIZE = 5;

const Home: NextPage = () => {
	const [pageNum, setPageNum] = useImmer(1);
	const [articles, setArticles] = useImmer<IArticlesWithPage | null>(null);
	const userInfo = useAppSelector((state) => state.user.data);

	useEffect(() => {
		getArticles();
	}, []);

	useEffect(() => {
		console.log(userInfo);
	});

	const getArticles = async () => {
		const res = await articlesService.getArticlesByPage({
			pageNum,
			pageSize: PAGE_SIZE
		});
		const resBody = await res.json();
		setArticles(resBody);
	};

	const changeLikeCount = (articleId: string, like: Like) => {};

	// * 点赞
	const handleClickLikeIcon = async (id: string, article: IArticle) => {
		if (userInfo) {
			const isLike = article.isUserLike ? Like.Dislike : Like.Like;
			await articlesService.changeBlogLike({
				userId: userInfo._id!,
				blogId: id,
				isLike
			});
			setArticles((draft) => {
				const isUserLike = isLike === Like.Like;
				const likedArticle = draft?.list.find((item) => item._id === id);
				likedArticle!.isUserLike = isUserLike;
				likedArticle!.likeCount! += isUserLike ? 1 : -1;
			});
		}
	};

	return (
		<MainLayout>
			<main className={styles['main']}>
				<section className={styles['featured-1']}>
					<div className={styles['container']}>
						<div>
							<p className={classNames('text-muted', styles['tap'])}>
								每天多学一点点
							</p>
							<h2 className={styles['title']}>Welcome to my blog</h2>
							<h3 className={styles['sub']}>欢迎来到我的博客👏🏻</h3>
						</div>
						<Image
							width={461}
							height={365}
							src="/images/featured.png"
							alt="featured"
						></Image>
					</div>
				</section>
				<div className={styles['featured-2']}>
					{/* <div className={styles['left']}> */}
					<div className={styles['left']}>
						<SectionTitle>最新文章</SectionTitle>
						{articles?.list.map((article) => (
							<ArticleCard
								onClickLikeIcon={(id) => handleClickLikeIcon(id, article)}
								article={article}
								key={article._id}
							/>
						))}
					</div>
					<div className={styles['right']}>
						<div className={styles['about-me']}>
							<div className={styles['card-bg']}>
								<a className={styles['piggies']}></a>
							</div>
							<div className={styles['content']}>
								<section className={styles['item']}>
									<p className={styles['num']}>0</p>
									<p className={styles['text']}>标签数</p>
								</section>
								<section className={styles['item']}>
									<p className={styles['num']}>0</p>
									<p className={styles['text']}>标签数</p>
								</section>
								<section className={styles['item']}>
									<p className={styles['num']}>0</p>
									<p className={styles['text']}>标签数</p>
								</section>
							</div>
						</div>
					</div>
				</div>
			</main>
		</MainLayout>
	);
};

export default Home;
