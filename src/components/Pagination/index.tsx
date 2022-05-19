import classNames from 'classnames';
import React, { MouseEventHandler, useEffect, useMemo } from 'react';
import { useImmer } from 'use-immer';
import styles from './index.module.scss';

interface IPagination {
	children?: React.ReactNode;
	pageSize?: number;
	currentPage?: number;
	total: number;
	onChange?: (page: number) => void;
}

const SHOW_PAGE_NUM = 5;

const Pagination: React.FC<IPagination> = (props) => {
	const { pageSize = 5, currentPage = 1, total, onChange } = props;
	const [current, setCurrent] = useImmer(currentPage);
	const [pages, setPages] = useImmer<number[]>([]);

	useEffect(() => {
		onChange?.(current);
	}, [current, onChange]);

	const pageCount = useMemo(
		() => Math.ceil(total / pageSize),
		[total, pageSize]
	);

	const handleClickArrow = (arrow: 'left' | 'right') => {
		if (arrow === 'left') {
			if (current !== 1) {
				setCurrent(current - 1);
			}
		} else {
			if (current !== pageCount) {
				setCurrent(current + 1);
			}
		}
	};

	const handlePageChange = (e: React.MouseEvent, clickedPage: number) => {
		if (clickedPage !== current) {
			setCurrent(clickedPage);
		}
	};

	const getPagesElement = () => {
		const pageCount = Math.ceil(total / pageSize);
		const showPageNum = Math.min(SHOW_PAGE_NUM, pageCount);
		const left = Math.max(1, current - Math.floor(showPageNum / 2));
		const right = Math.min(pageCount, left + showPageNum - 1);
		const leftDots = left > 2;
		const rightDots = right < pageCount - 1;
		const pages: number[] = [];
		console.log(left);
		for (let i = left; i <= right; i++) {
			console.log('i', i);
			pages.push(i);
		}
		setPages([...pages]);
	};

	useEffect(() => {
		getPagesElement();
	}, [current, pageSize, pageCount]);

	return (
		<p className={styles['container']}>
			<a
				onClick={() => handleClickArrow('left')}
				className={classNames(styles['item'], {
					[styles['disabled']]: current === 1
				})}
			>
				<i className={`iconfont icon-leftarrow`}></i>
			</a>
			{pages.map((page) => (
				<a
					key={page}
					onClick={(e) => handlePageChange(e, page)}
					className={classNames(styles['item'], {
						[styles['active']]: page === current
					})}
				>
					{page}
				</a>
			))}
			<a
				onClick={() => handleClickArrow('right')}
				className={classNames(styles['item'], {
					[styles['disabled']]: current === pageCount
				})}
			>
				<i className={`iconfont icon-Rightarrow`}></i>
			</a>
		</p>
	);
};

export default Pagination;
