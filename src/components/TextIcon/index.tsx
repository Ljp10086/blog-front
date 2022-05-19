import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';

interface ITextIcon {
	children: React.ReactNode;
	icon: string;
	isActive?: boolean;
	onClick?: React.MouseEventHandler;
}

const TextIcon: React.FC<ITextIcon> = (props) => {
	const { children, icon, onClick, isActive } = props;
	const classes = classNames(styles['dot'], styles['text-with-icon'], {
		[styles['click']]: onClick,
		[styles['active']]: isActive
	});

	return (
		<p className={classes} onClick={(e) => onClick?.(e)}>
			<i className={`iconfont icon-${icon}`}></i>
			<span>{children}</span>
		</p>
	);
};

export default TextIcon;
