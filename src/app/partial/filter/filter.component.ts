import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'src/app/entities/pagination.entity';
import * as moment from 'moment'
import flatpickr from "flatpickr";

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
  date_range = `${this.date_start} to ${this.date_end}`
  
  constructor() { }

  ngOnInit() { 
    this.onConfig.emit(`${this.date_start} to ${this.date_end}`)
    flatpickr("#flatpickr07", {
      mode: "range",
      dateFormat: "Y-m-d",
      defaultDate: this.date_range
    });
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
      this.pagination.fromTime = new Date(`${moment(temp[0]).format('YYYY-MM-DD')}`).getTime()
      this.pagination.toTime = new Date(`${moment(temp[0]).format('YYYY-MM-DD')}`).getTime()
    } else if (temp.length > 1){
      this.pagination.fromTime = new Date(`${moment(temp[0]).format('YYYY-MM-DD')}`).getTime()
      this.pagination.toTime = new Date(`${moment(temp[1]).format('YYYY-MM-DD')}`).getTime()
    }
    this.pagination.page = 1;
    this.loadDatas.emit(this.pagination);
  }
}
