import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { IArticle } from 'types/articles.type';
import { formateDate } from 'utils/date';
import Link from 'next/link';
import TextIcon from 'components/TextIcon';
import { useAppSelector } from 'features/hooks';

interface IArticleCard {
	article: IArticle;
	onClickLikeIcon?: (articleId: string) => void;
}

const ArticleCard: React.FC<IArticleCard> = (props) => {
	const { article, onClickLikeIcon } = props;
	const userInfo = useAppSelector((state) => {
		return state.user.data;
	});

	return (
		<div className={styles['container']}>
			<div className={styles['left']}>
				<a
					style={{
						backgroundImage: `url(${
							article.coverPic ?? '/images/default.webp'
						})`
					}}
					className={styles['img']}
				></a>
			</div>
			<div className={styles['right']}>
				<p className={styles['category']}>
					{article.category?.map((item) => (
						<a key={item} className={styles['item']}>
							{item}
						</a>
					))}
				</p>
				<p className={styles['title']}>
					<Link href={`/blog-detail/${article._id}`}>{article.title}</Link>
				</p>
				<div className={styles['footer']}>
					<TextIcon
						isActive={article.isUserLike}
						onClick={() => {
							onClickLikeIcon?.(article._id!);
						}}
						icon="like"
					>
						{article.likeCount}
					</TextIcon>
					<TextIcon icon="eye">{article.visitAllNumber}</TextIcon>
					<span>{formateDate(article.updateDate ?? new Date())}</span>
				</div>
			</div>
		</div>
	);
};

export default ArticleCard;
