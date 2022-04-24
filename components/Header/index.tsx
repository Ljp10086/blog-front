import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import Button from 'components/Button';
import Divider from 'components/Divider';

const Header = () => {
	return (
		<div className={styles['header-top']}>
			<div className={styles['container']}>
				<div>
					<Image
						className={styles['logo']}
						width={100}
						height={60}
						src="/logo.png"
						alt="logo"
					></Image>
				</div>

				<div className={styles['right']}>
					{/* <Divider direction="vertical"></Divider> */}

					<a className={styles['search']}>
						<i className="iconfont icon-Search"></i>
						搜索
					</a>
					<Button>登录</Button>
				</div>
			</div>
		</div>
	);
};

export default Header;
