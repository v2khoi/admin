import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'selectbox'
})

export class SelectboxPipe implements PipeTransform {
    transform(item: string, sel?: any): any {
        switch(sel){
            case '1':
                return this.phoneFormat(item);
            case '2':
                return this.dateFormat(item);
            case '3':
                return this.dateFormat(item, 'DD/MM/YYYY h:mm:ss a');
            default:
                return item;
        }
    }

    phoneFormat(tel: any, empty?: boolean)
    {
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

    dateFormat(date: any, format: any = 'DD/MM/YYYY'){
        let d = new Date(date)
        return moment(d).format(format)
    }
}