import classNames from 'classnames';
import ArticleCard from 'components/ArticleCard';
import Footer from 'components/Footer';
import Header from 'components/Header';
import SectionTitle from 'components/SectionTitle';
import type { NextPage } from 'next';
import Image from 'next/image';
import Nav from '../components/Nav';
import styles from './index.module.scss';

const Home: NextPage = () => {
	return (
		<div>
			<header>
				<Header></Header>
				<Nav></Nav>
			</header>
			<main className={styles['main']}>
				<section className={styles['featured-1']}>
					<div className={styles['container']}>
						<div>
							<p className={classNames('text-muted', styles['tap'])}>
								每天多学一点点
							</p>
							<h2 className={styles['title']}>Welcome to my blog</h2>
							<h3 className={styles['sub']}>欢迎来到我的博客👏🏻</h3>
						</div>
						<Image
							width={461}
							height={365}
							src="/images/featured.png"
							alt="featured"
						></Image>
					</div>
				</section>
				<section className={styles['featured-2']}>
					<SectionTitle>文章</SectionTitle>
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Home;
