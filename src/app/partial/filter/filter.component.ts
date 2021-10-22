import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'src/app/entities/pagination.entity';
import * as moment from 'moment'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

  @Input() pagination = new Pagination();
  @Input() items = [10, 25, 50, 100];  
  @Input() hidden = true;  
  @Output() loadDatas = new EventEmitter <any> (true);
  @Output() onConfig = new EventEmitter <any> ();

  search = "";
  date_start = moment().clone().startOf('month').format('YYYY-MM-DD');
  date_end = moment().clone().endOf('month').format('YYYY-MM-DD');
  date_range = `["${this.date_start}", "${this.date_end}"]`
  constructor() { }

  ngOnInit() { 
    // this.onConfig.emit(`${this.date_start},${this.date_end}`)
  }

  onChangeFilter(event: any){
    this.pagination.page = 1;
    this.pagination.perPage = event.target.value;
    this.loadDatas.emit(this.pagination);
  }

  onSearch(event: any){
    this.pagination.search = event.target.value.trim().toLowerCase();
    this.pagination.page = 1;
    this.loadDatas.emit(this.pagination);
  }

  onChangeDate(event: any){
    const temp = event.target.value.split(' to ')
    if(temp.length == 1){      
      this.pagination.dateRange = `${temp[0]},${temp[0]}`
    } else if (temp.length > 1){
      this.pagination.dateRange = temp.join(',')
    }
    this.pagination.page = 1;
    this.loadDatas.emit(this.pagination);
  }
}
