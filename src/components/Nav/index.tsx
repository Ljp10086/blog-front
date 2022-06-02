import React from 'react';
import styles from './index.module.scss';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { routes } from 'src/routes';

interface INav {}

type RouteConfig = typeof routes[0];

const Nav: React.FC<INav> = (props) => {
	const router = useRouter();
	const getClasses = (route: RouteConfig) => {
		const classes = classnames(styles['item'], {
			[styles['active']]: router.asPath === route.path
		});
		return classes;
	};

	const renderNavItems = (routes: RouteConfig[]) => {
		return routes.map((route) => {
			return (
				<li key={route.label} className={getClasses(route)}>
					<Link href={route.path}>{route.label}</Link>
				</li>
			);
		});
	};

	return (
		<div className={styles['container']}>
			<div className={styles['wrapper']}>
				<ul className={styles['nav']}>{renderNavItems(routes)}</ul>
				<div className={styles['right']}>
					<a className={styles['logo']}>
						<Image
							width={24}
							height={24}
							src="/images/github.png"
							alt="github"
						></Image>
					</a>
					<a className={styles['logo']}>
						<Image
							width={24}
							height={24}
							src="/images/wechart.png"
							alt="wechart"
						></Image>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Nav;
