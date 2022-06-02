import MainLayout from '../../layouts/Main';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import remarkGfm from 'remark-gfm';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styles from './index.module.scss';
import mdStyles from './markdown.module.scss';
import Image from 'next/image';
import Fetch from '../../httpHelper';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { articlesService } from '../../services';
import Markdown from 'src/components/Markdown';

const BlogDetail = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { article } = props;
	const router = useRouter();
	useEffect(() => {
		if (router.query.id) {
			articlesService.upVisit(router.query.id as string);
		}
	}, []);

	return (
		<MainLayout>
			<div className={styles['wrapper']}>
				<div className={styles['container']}>
					<div className={styles['title']}>{article.title}</div>
					<div className={styles['cover-pic']}>
						<Image
							layout="fill"
							src={article.coverPic ?? '/images/default.webp'}
							alt={article.title}
						></Image>
					</div>
					<div className={styles['content']}>
						<Markdown>{article.contentMd}</Markdown>
						{/* <article className={classNames(mdStyles['markdown-body'])}>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{article.contentMd}
							</ReactMarkdown>
						</article> */}

						<div className={styles['tags-container']}>
							标签：
							{article.tags.map((tag: string) => (
								<a key={tag} className={styles['tag']}>
									{tag}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query;
	const res = await Fetch.get(`/blog/getBlogById/${id}`);
	const article = await res.json();
	return {
		props: {
			article
		}
	};
};

export default BlogDetail;
