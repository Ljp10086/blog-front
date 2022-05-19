import classNames from 'classnames';
import React from 'react';
import { ICategory } from '../../types/category.type';
import styles from './index.module.scss';
import Image from 'next/image';

interface ICategoryCard {
	category: ICategory;
}

const CategoryCard: React.FC<ICategoryCard> = (props) => {
	const { category } = props;

	return (
		<div className={styles['container']}>
			<div className={styles['top']}>
				<Image
					height={56}
					width={100}
					layout="responsive"
					src={category?.coverPic ?? '/images/default.webp'}
					alt={category.coverPic}
				></Image>
			</div>
			<div className={styles['bottom']}>
				<p className={styles['title']}>{category.name}</p>
			</div>
		</div>
	);
};

export default CategoryCard;
