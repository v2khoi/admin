import { Component, OnInit, Pipe } from '@angular/core';
import { Pagination } from '../../entities/pagination.entity';
import { GroupService } from './groups.service';
import { Config } from '../../entities/config.entity'
import * as moment from 'moment'
import { XlsxService } from '../../services/xlsx/xlsx.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnInit {
  // transform(){}
  configName = 'groups';
  title = 'Groups management';
  breadcrumb = [{ name: 'Settings groups' }, { name: 'Group'}];
  pagination = new Pagination();
  filter_items = [1, 10, 20, 50];
  check_item = {
    value: 'invalid', 
    message: '\'Key name\' isn\'t empty'
  };
  // searchOn = '';
  loading = false;
  temps: any;
  datas: Object[] | any = [];
  arr_key: any;
  date_range_hidden = true;
  

  current_item_id: any; 
  complete: boolean = false;
  list_selected = [];
  modal = {
    IsmodelShow: false,
    type: 'warning', 
    note: 'Warning', 
    content: 'Do you want to delete?',
    form: '<h1>A</h1>',
    button: [
      { 
        text: 'Yes', 
        action: (id: any, status = 'active') => { this.inactive(id, 'status', status); }
      }
    ]
  };

  constructor(
    private xlsx: XlsxService,
    private groupService: GroupService
  ) {
    this.pagination.sortBy = 'name'
    this.pagination.perPage = 10
  }

  ngOnInit(): void {}

  loadDatas(pagination: any, loading = true){
    this.loading = loading;    
    this.groupService.getGroups(pagination).subscribe((result: any) => {
      this.pagination = result.data.pagination;
      this.datas = result.data.datas
      if(result.data.datas.length > 0){
        this.arr_key = Object.keys(this.datas[0]);
      }
      this.loading = false;
    })
  }  
  
  sortBy(sortBy: string, orderBy: string, flag: boolean = true){
    if(!flag) return;
    this.pagination.orderBy = orderBy;
    this.pagination.sortBy = sortBy;   
    this.loadDatas(this.pagination);
  }

  onConfig(items: Config[] | string){
    if(typeof items == 'string' && this.date_range_hidden){
      const temp = items.split(' to ')
      if(temp.length == 1){      
        this.pagination.fromTime = new Date(`${moment(temp[0]).format('YYYY-MM-DD')}`).getTime()
        this.pagination.toTime = new Date(`${moment(temp[0]).format('YYYY-MM-DD')}`).getTime()
      } else if (temp.length > 1){
        this.pagination.fromTime = new Date(`${moment(temp[0]).format('YYYY-MM-DD')}`).getTime()
        this.pagination.toTime = new Date(`${moment(temp[1]).format('YYYY-MM-DD')}`).getTime()
      }
      this.pagination.page = 1;
    }else if(typeof items == 'object'){
      this.pagination.searchOn = items.filter(row => { 
        if(row.key == 'createdAt') 
          this.date_range_hidden = row.search?false:true; 
        return row.search
      }).map(row => row.key).join(',');
      this.temps = items;
    }
    this.loadDatas(this.pagination)
  }

  checkItem(value: any){
    let temp = this.datas as [];
    this.check_item = temp.find(x => x[value])?{
      value: 'valid', 
      message: `Key name: \'${value}\' is found`
    }:{
      value: 'invalid', 
      message: `Key name: \'${value}\' isn\'t found`
    };
  }

  addItem(item: Object[], event: any){
    // @ts-ignore
    const index: number = this.list_selected.indexOf(item.id);
    if(index == -1){
      if(event.target.checked == true)
        // @ts-ignore
        this.list_selected.push(item.id);
    }else if(event.target.checked == false){
      this.list_selected.splice(index, 1);
    }
  }

  setAll(event: any){
    // @ts-ignore
    this.datas.map(item => {
      this.addItem(item, event);
    });
  }

  onChecked(item: any){
    // @ts-ignore
    const index: number = this.list_selected.indexOf(item.id);
    return (index !== -1)?true:false;
  }

  onDelete(ids: any){
    this.modal.content = "Do you want to delete this item?";
    if(typeof(ids) == 'object' && this.list_delete().length > 1){
      this.modal.content = "Do you want to delete (" + this.list_delete().length + ") items?";
      this.current_item_id = this.list_selected;
    }else{
      this.current_item_id = ids;
    }    
  }
  
  list_delete = (cond = [-1])=>{
    const _ids: any = [];
    this.list_selected.forEach(item => {
      this.datas.filter((xs: any) => {
        if(cond.find(x => (x == xs.inactive)) == undefined && item == xs.id)
          _ids.push(item);
      });
    });
    return _ids;
  };

  inactive(ids: any, propName: string = 'status', status = 'active'){
    if(typeof(ids) == 'object'){
      ids = this.list_delete();
    }
    this.groupService.editGroups(ids, {        
      ids: (typeof(ids) == 'object'? ids:[ids]),
      update: [{'propName': propName, 'value': status}]
    }).subscribe((result) => {
      if(status == 'deleted'){
        this.complete = false;
        this.list_selected = [];
      }
      this.loadDatas(this.pagination);
    });
    
    return false;
  }

  onExport(){
    this.xlsx.xportAsExcelFile(this.datas, this.temps, 'groups_'); 
  }
}
