import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';

interface ITitle {
	children: React.ReactNode;
}

const Title: React.FC<ITitle> = (props) => {
	const { children } = props;
	return <p className={styles['title']}>{children}</p>;
};

export default Title;
