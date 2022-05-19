import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import Button from 'src/components/Button';
import Divider from 'src/components/Divider';
import { ssoService, userService } from '../../services';
import { useRouter } from 'next/router';
import { IUserInfo } from '../../types/user.type';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { addUserInfo } from '../../features/userSlice';

const Header = () => {
  const dispatch = useAppDispatch()

	const userInfo = useAppSelector(state => {
		return state.user.data;
	});

	const router = useRouter();

	useEffect(() => {
		getUserInfo();
	}, []);

	const loginWithGithubSSO = () => {
		ssoService.loginWithGithubSSO(router);
	};

	const getUserInfo = async () => {
		try {
			const userInfo = await userService.getUserInfo();
			dispatch(addUserInfo(userInfo));
		} catch (error) {
			dispatch(addUserInfo());
		}
	};

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
					<a className={styles['search']}>
						<i className="iconfont icon-Search"></i>
						搜索
					</a>
					{userInfo ? (
						<div className={styles['avatar']}>
							<Image
								layout="fill"
								src={userInfo.avatarUrl!}
								alt={userInfo.avatarUrl}
							></Image>
						</div>
					) : (
						<Button onClick={loginWithGithubSSO}>登录</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
