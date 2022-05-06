import * as moment from 'moment'

// export default class FormatUtils {
export const formatContent = (item: string, sel?: any, arg1?: any, arg2?: any, arg3?: any): any => {
	switch(sel){
		case '1':
			return phoneFormat(item);
		case '2':
			return dateFormat(item);
		case '3':
			return dateFormat(item, 'DD/MM/YYYY h:mm:ss a');
		case '4':
				// console.log
			return (+item).toLocaleString(arg1, {
					style: 'currency',
					currency: arg2,
			});
		case '5':
			return item ? 'Active' : 'Blocked'
		default:
			return item;
	}
}

/**
 * Format Phone number
 * @param tel 
 * @param empty 
 * @returns 
 */
const phoneFormat = (tel: any, empty?: boolean): string => {
	var value = tel.toString().trim().replace(/^\+/, '');
	if (value.match(/[^0-9]/)) {
		return tel;
	}
	var str_1, str_2;
	switch (value.length) {
		case 0:
			return '';
		case 10: 
			str_1 = value.slice(0, 3);
			str_2 = value.slice(3);
			break;
		case 11: 
			str_1 = value.slice(1, 4);
			str_2 = value.slice(4);
			break;
		default:
			return tel;
	}
	str_2 = str_2.slice(0, 3) + '-' + str_2.slice(3);
	return (str_1 + "-" + str_2).trim();
}

/**
 * Format Date
 * @param date 
 * @param format 
 * @returns 
 */
const dateFormat = (date: any, format: any = 'DD/MM/YYYY'): any => {
	let d = new Date(date)
	return moment(d).format(format)
}