import CategoryCard from '../../components/CategoryCard';
import Pagination from '../../components/Pagination';
import MainLayout from '../../layouts/Main';
import React, { useEffect } from 'react';
import { categoryService } from '../../services';
import { ICategoryWithPage } from '../../types/category.type';
import { useImmer } from 'use-immer';
import styles from './index.module.scss';

const Category = () => {
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
					onChange={(current) => {
						setPageNum(current);
					}}
					currentPage={pageNum}
					total={categoryWithTotal?.total ?? 0}
				></Pagination>
			</div>
		</MainLayout>
	);
};

export default Category;
