import Breadcrumbs from 'src/components/Breadcrumbs';
import MainLayout from 'src/layouts/Main';
import { useImmer } from 'use-immer';
import styles from './index.module.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import path from 'path';
import { promises as fs } from 'fs';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect } from 'react';
import rehypeRaw from 'rehype-raw';
import Markdown from 'src/components/Markdown';

interface Props {
	mdContent: string;
}

const AboutMe = ({
	mdContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	useEffect(() => {
		console.log(mdContent);
	}, []);

	return (
		<MainLayout>
			<div className={styles['container']}>
				<Breadcrumbs
					breadcrumbItems={[
						{
							label: '首页',
							link: '/'
						},
						{
							label: '关于我',
							link: '/about-me'
						}
					]}
				></Breadcrumbs>
				<Markdown>{mdContent}</Markdown>
			</div>
		</MainLayout>
	);
};

export const getStaticProps = async () => {
	const mdContent = await fs.readFile(
		path.join(process.cwd(), './about-me.md'),
		'utf-8'
	);

	return {
		props: {
			mdContent
		}
	};
};

export default AboutMe;
