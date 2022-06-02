import { useRouter } from 'next/router';
import React from 'react';
import styles from './index.module.scss';

interface IQuickLink {
	children: React.ReactNode;
	to: string;
}

const QuickLink: React.FC<IQuickLink> = (props) => {
	const { children, to } = props;
	const route = useRouter();

	return (
		<p className={styles['quick-link']}>
			<a
				onClick={() => {
					route.push(to);
				}}
			>
				{children}
			</a>
		</p>
	);
};

export default QuickLink;
