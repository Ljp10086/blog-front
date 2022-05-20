import classNames from 'classnames';
import React, { useMemo } from 'react';
import { ICategory } from '../../types/category.type';
import styles from './index.module.scss';
import Image from 'next/image';
import Divider from '../Divider';
import { useRouter } from 'next/router';

interface IBreadcrumbItem {
	link: string;
	onClick?: Function;
	label: string;
}

interface IBreadcrumbs {
	breadcrumbItems: IBreadcrumbItem[];
}

const Breadcrumbs: React.FC<IBreadcrumbs> = (props) => {
	const { breadcrumbItems } = props;
	const route = useRouter();

	const title = useMemo(
		() => breadcrumbItems[breadcrumbItems.length - 1],
		[breadcrumbItems]
	);

	const handleClickLabel = (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
		item: IBreadcrumbItem
	) => {
		const currentPath = route.pathname;
		if (item.link === currentPath) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		console.log(currentPath);
		route.push(item.link);
	};

	return (
		<div className={styles['breadcrumbs']}>
			<p className={styles['title']}>{title?.label}</p>
			<div className={styles['items-wrapper']}>
				{breadcrumbItems.map((item) => (
					<div className={styles['item']} key={item.label}>
						<span onClick={(e) => handleClickLabel(e, item)}>{item.label}</span>
						<span
							className={classNames('iconfont icon-right1', styles['icon'])}
						></span>
					</div>
				))}
			</div>
			<Divider bgColor="light" />
		</div>
	);
};

export default Breadcrumbs;
