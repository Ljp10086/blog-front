import classNames from 'classnames';
import React, { forwardRef } from 'react';
import styles from './index.module.scss';

type Props = {
	children?: React.ReactNode;
	type?: 'primary' | 'default';
};

type NativeAttrs = Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	keyof Props
>;

type ButtonProps = Props & NativeAttrs;

const Button: React.ForwardRefExoticComponent<ButtonProps> = forwardRef(
	(props: ButtonProps, ref) => {
		const { className = '', type = 'default', children, ...rest } = props;
		const btnRef = ref && (React.createRef() as any);

		const classes = classNames(styles['btn'], className, {
			[styles[`btn-${type}`]]: type
		});

		return (
			<button className={classes} ref={btnRef} {...rest}>
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';

export default Button;
