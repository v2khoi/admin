import { Component, OnInit, Pipe } from '@angular/core';
import { Pagination } from '../../entities/pagination.entity';
import { GroupService } from './groups.service';
import { Config } from '../../entities/config.entity'

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnInit {
  // transform(){}
  configName = 'groups';
  title = 'groups management';
  breadcrumb = [{ name: 'Settings groups' }, { name: 'Group'}];
  pagination = new Pagination();
  filter_items = [1, 10, 20, 50];
  check_item = {
    value: 'invalid', 
    message: '\'Key name\' isn\'t empty'
  };
  searchOn = '';
  loading = false;
  temps: any;
  datas: Object[] | any = [];
  arr_key: any;
  date_range_hidden = true;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {}

  // loadDatas(pagination: any, loading = true){
  //   this.loading = loading;    
  //   this.groupService.getGroups(pagination).subscribe((result: any) => {
  //     this.pagination = result.data.pagination;
  //     this.datas = result.data.groups
  //     if(result.data.groups.length > 0){
  //       this.arr_key = Object.keys(this.datas[0]);
  //     }
  //     this.loading = false;
  //   })
  // }  
  
  // sortBy(sortBy: string, orderBy: string, flag: boolean = true){
  //   if(!flag) return;
  //   this.pagination.orderBy = orderBy;
  //   this.pagination.sortBy = sortBy;   
  //   this.loadDatas(this.pagination);
  // }

  // onConfig(items: Config[] | string){
  //   if(typeof items == 'string' && this.date_range_hidden){
  //     this.pagination.dateRange = items;
  //   }else if(typeof items == 'object'){
  //     this.pagination.searchOn = items.filter(row => { 
  //       if(row.key == 'createdAt') 
  //         this.date_range_hidden = row.search?false:true; 
  //       return row.search
  //     }).map(row => row.key).join(',');

  //     this.temps = items;
  //   }
  //   this.loadDatas(this.pagination)
  // }

  // checkItem(value: any){
  //   let temp = this.datas as [];
  //   this.check_item = temp.find(x => x[value])?{
  //     value: 'valid', 
  //     message: `Key name: \'${value}\' is found`
  //   }:{
  //     value: 'invalid', 
  //     message: `Key name: \'${value}\' isn\'t found`
  //   };
  // }
}
