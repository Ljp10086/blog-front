import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import Title from './title';
import QuickLink from 'src/components/QuickLink';

const Footer: React.FC = (props) => {
	return (
		<footer className={styles['footer']}>
			<div className={styles['container']}>
				<section className={styles['section']}>
					<div>
						<Title>关于我</Title>
						<p className={styles['content']}>前端小码农一只</p>
						<p className={styles['subtitle']}>坐标</p>
						<p className={styles['content']}>北京朝阳</p>
						<p className={styles['subtitle']}>联系我</p>
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
					</div>
				</section>
				<section className={styles['section']}>
					<Title>快捷链接</Title>
					<QuickLink>首页</QuickLink>
					<QuickLink>文章</QuickLink>
					<QuickLink>留言</QuickLink>
					<QuickLink>时间轴</QuickLink>
					<QuickLink>关于我</QuickLink>
				</section>
			</div>
		</footer>
	);
};

export default Footer;
