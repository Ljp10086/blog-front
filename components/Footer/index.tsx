import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import Title from './title';

const Footer: React.FC = (props) => {
	return (
		<footer className={styles['footer']}>
			<div className={styles['container']}>
				<section className={styles['section']}>
					<div>
						<Title>关于我</Title>
						<p className={styles['content']}>前端小码农一只</p>
					</div>
				</section>
				<section className={styles['section']}>
					<Title>联系我</Title>
					<div>
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
				</section>
				<section></section>
			</div>
		</footer>
	);
};

export default Footer;
