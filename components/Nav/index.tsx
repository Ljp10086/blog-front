import React from 'react';
import styles from './index.module.scss';
import classnames from 'classnames';
import { useRouter } from 'next/router';

interface INav {}

const routes = [
	{
		path: '/',
		label: '首页'
	},
	{
		path: '/',
		label: '文章'
	},
	{
		path: '/message',
		label: '留言'
	},
	{
		path: '/about-me',
		label: '时间轴'
	},
	{
		path: '/about-me',
		label: '关于我'
	}
];

type RouteConfig = typeof routes[0];

const Nav: React.FC<INav> = (props) => {
	const router = useRouter();

	const getClasses = (route: RouteConfig) => {
		const classes = classnames(styles['item'], {
			[styles['active']]: router.asPath.startsWith(route.path)
		});
		return classes;
	};

	const renderNavItems = (routes: RouteConfig[]) => {
		return routes.map((route) => {
			return (
				<li key={route.label} className={getClasses(route)}>
					{route.label}
				</li>
			);
		});
	};

	return (
		<div className={styles['container']}>
			<div className={styles['wrapper']}>
				<ul className={styles['nav']}>{renderNavItems(routes)}</ul>
			</div>
		</div>
	);
};

export default Nav;
