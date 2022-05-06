
import * as moment from 'moment'
export class Pagination {
    page = 1;
    perPage = 10;
    total = 0;
    totalPage = 1;
    search?: string;
    searchOn?: string;
    orderBy?: string;
    sortBy?: string;
    fromTime?: number = new Date(moment().format('YYYY-MM-DD')).getTime()
    toTime?: number = new Date(moment().format('YYYY-MM-DD')).getTime()
}