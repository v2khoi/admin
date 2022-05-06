import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'src/app/entities/pagination.entity';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
  @Input() disabled = false;
  @Input() pagination = new Pagination();
  @Output() loadDatas = new EventEmitter <any> ();

  constructor() { }

  ngOnInit(): void {}  

  setPage(page: number) {
    if(this.pagination.page != page){
      this.pagination.page = page;
      this.loadDatas.emit(this.pagination);
    }
    return false;
  }

  range(start: number, stop: number, step: number) {
    var a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    return a;
  }

  setInt(num: number){
    return Math.ceil(num);
  }
}
