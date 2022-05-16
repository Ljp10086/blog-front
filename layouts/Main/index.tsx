import Footer from 'components/Footer';
import Header from 'components/Header';
import Nav from 'components/Nav';
import React from 'react';
import styles from './index.module.scss';

export interface IMainLayout {
	children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
	return (
		<div className={styles['container']}>
			<Header />
			<Nav></Nav>
			<div className={styles['content']}>{children}</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
