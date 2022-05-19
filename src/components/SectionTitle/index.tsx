import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';

interface ISectionTitle {
	children: React.ReactNode;
}

const SectionTitle: React.FC<ISectionTitle> = (props) => {
	const { children } = props;

	return <h5 className={styles['widget-header']}>{children}</h5>;
};

export default SectionTitle;
