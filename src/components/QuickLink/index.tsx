import React from 'react';
import styles from './index.module.scss';

interface IQuickLink {
	children: React.ReactNode;
}

const QuickLink: React.FC<IQuickLink> = (props) => {
	const { children } = props;

	return (
		<p className={styles['quick-link']}>
			<a> {children}</a>
		</p>
	);
};

export default QuickLink;
