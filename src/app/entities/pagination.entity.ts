export class Pagination {
    page = 1;
    perPage = 10;
    total = 0;
    totalPage = 1;
    search?: string;
    searchOn?: string;
    orderBy?: string;
    sortBy?: string;
    dateRange?: string;
}