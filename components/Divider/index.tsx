import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';

interface IDivider {
	direction?: 'horizontal' | 'vertical';
}

const Divider: React.FC<IDivider> = (props) => {
	const { direction = 'horizontal' } = props;
	console.log(direction);
	const classes = classNames(styles['divider'], styles[`${direction}`]);

	console.log(classes);
	return <div className={classes}></div>;
};

export default Divider;
