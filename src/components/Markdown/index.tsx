import remarkGfm from 'remark-gfm';
import React from 'react';
import mdStyles from './markdown.module.scss';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import rehypeRaw from 'rehype-raw';

const Markdown = ({ children }: { children: string }) => {
	return (
		<article className={classNames(mdStyles['markdown-body'])}>
			<ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
				{children}
			</ReactMarkdown>
		</article>
	);
};

export default Markdown;
