import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

export const formateDate = (
	date: string | Date,
	format: string = 'YYYY-MM-DD'
) => {
	return dayjs(date).format(format);
};
