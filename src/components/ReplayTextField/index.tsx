import { useRouter } from 'next/router';
import React, { memo } from 'react';
import { useImmer } from 'use-immer';
import Button from '../Button';
import styles from './index.module.scss';

interface IReplayTextField {
	onConfirm?: Function;
	onCancel?: Function;
	onChange?: Function;
}

const ReplayTextField: React.FC<IReplayTextField> = (props) => {
	const { onConfirm, onCancel, onChange } = props;
	const [value, setValue] = useImmer('');

	return (
		<div className={styles['container']}>
			<div className={styles['field']}>
				<textarea
					onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
						const value = (e.target as HTMLTextAreaElement).value;
						setValue(value);
						onChange?.(value);
					}}
					className={styles['input']}
				></textarea>
			</div>
			<div className={styles['bottom']}>
				<Button
					onClick={() => onConfirm?.(value)}
					type="primary"
					className={styles['commit']}
				>
					提交
				</Button>
				<Button onClick={(e) => onCancel?.(e)} type="default">
					取消
				</Button>
			</div>
		</div>
	);
};

export default React.memo(ReplayTextField);
