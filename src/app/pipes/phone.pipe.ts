import { Injectable, Pipe } from '@angular/core';

@Pipe({
    name: 'phone'
})

export class PhonePipe
{
    transform(tel: any, empty: boolean)
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
}