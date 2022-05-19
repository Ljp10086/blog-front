import CategoryCard from '@app/components/CategoryCard';
import Pagination from '@app/components/Pagination';
import MainLayout from '@app/layouts/Main';
import React, { useEffect } from 'react';
import { categoryService } from '@app/services';
import { ICategoryWithPage } from '@app/types/category.type';
import { DraftFunction, useImmer } from 'use-immer';
import styles from './index.module.scss';

const Blog = () => {
	const [pageNum, setPageNum] = useImmer(1);
	const [categoryWithTotal, setCategoryWithTotal] =
		useImmer<null | ICategoryWithPage>(null);

	useEffect(() => {
		getCategoryByPage();
	});

	useEffect(() => {
		getCategoryByPage();
	}, [pageNum]);

	const getCategoryByPage = async () => {
		const res = await categoryService.getCategoryByPage({
			pageNum,
			pageSize: 5
		});
		const resBody = await res.json();
		setCategoryWithTotal(resBody);
	};

	return (
		<MainLayout>
			<div className={styles['container']}>
				<div className={styles['categories']}>
					{categoryWithTotal?.list.map((category) => (
						<CategoryCard key={category._id} category={category} />
					))}
				</div>
				<Pagination
					onChange={(current: number) => {
						setPageNum(current);
					}}
					currentPage={pageNum}
					total={categoryWithTotal?.total ?? 0}
				></Pagination>
			</div>
		</MainLayout>
	);
};

export default Blog;
