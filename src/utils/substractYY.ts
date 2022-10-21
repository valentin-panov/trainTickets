import moment from 'moment';

export const substractYY = (str: string): string => moment(str, 'YYYY-MM-DD').subtract(1, 'years').format('YYYY-MM-DD');
