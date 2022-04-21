import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';

const Header = () => {
	return (
		<div>
			<Image width="64" height="64" src="/logo.png" alt="logo"></Image>
		</div>
	);
};

export default Header;
