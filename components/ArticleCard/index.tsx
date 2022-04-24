import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';

interface IArticleCard {}

const ArticleCard: React.FC<IArticleCard> = (props) => {
	return (
		<div className={styles['container']}>
			<div className={styles['left']}>
				<a className={styles['img']}>
					<Image
						layout="fill"
						src="http://demo.mxyhn.xyz:8020/cssthemes6/adve43r22qedasdqw/assets/imgs/news/news-3.jpg"
						alt="图片加载失败"
					></Image>
				</a>
			</div>
			<div className={styles['right']}>
				<p className={styles['category']}>分类</p>
				<p className={styles['title']}>
					标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
				</p>
				<p className={styles['footer']}>27 SEP 10 MINS READ 22K VIEWS</p>
			</div>
		</div>
	);
};

export default ArticleCard;
