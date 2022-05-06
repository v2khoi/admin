import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html'
})
export class ConfigComponent implements OnInit {
  @Input() title = '';
  @Input() configName = '';
  @Input('temps') items: Object[] | any = [];
  @Input() arr_key: any;
  @Input() list_selected: any = [];
  @Input() check_item = {
    value: 'invalid', 
    message: '\'Key name\' isn\'t empty'
  };
  @Output() checkItem = new EventEmitter <any> ();
  @Output() onConfig = new EventEmitter <any> ();
  @Output() onDelete = new EventEmitter <any> ();
  @Output() onExport = new EventEmitter <any> ();

  hidden = true;
  keyname = '';
  alert = {
    hidden: true,
    type: 'success',
    message: 'Thành công'
  }

  constructor(
    private config: ConfigService) { }

  ngOnInit(): void {
    this.onLoad()
  }

  onLoad(){
    this.config.getJson(this.configName).subscribe((result: any) => {
      const configs = result.data.config;
      this.items = configs.guiTable;
      this.alert.type = result.code == 200? 'success': 'danger'
      this.alert.message = result.message
      this.alert.hidden = false
      this.onConfig.emit(this.items);
    });
  }

  onSave(){
    this.config.putJson(this.configName, { guiTable:  this.items }).subscribe((result: any) => {
      this.items = result.data.config.guiTable;
      this.alert.type = result.code == 200? 'success': 'danger'
      this.alert.message = result.message
      this.alert.hidden = false
      this.onConfig.emit(this.items);
    });
  }

  addField(){
    if(this.items === undefined)
      this.items = [];
    
    if(this.check_item.value == 'valid'){
      this.items.push({key: this.keyname, value: '', format: '', sort: false, visible: false, search: false, export: false});
      this.check_item = {
        value: 'invalid', 
        message: '\'Key name\' isn\'t empty'
      }
      this.keyname = "";
    }
    return false;
  }

  async checkKey(event: any){
    const temp = this.items as [];
    if(this.keyname != ""){
      if(!temp.find(x => x['key'] == event.target.value)){        
        this.checkItem.emit(event.target.value); 
      }else{
        this.check_item.value = 'invalid';
        this.check_item.message = `Key name: \'${this.keyname}\' is existed`;
      }
    }else{      
      this.check_item.value = 'invalid';
      this.check_item.message = `Key name: \'${this.keyname}\' isn\'t empty`;
    }
  }

  updateItem(index: number, key: string, value: any){
    this.items[index][key] = key!='value'?value:value.target.value;
    this.onConfig.emit(this.items);
  }

  updateFormat(index: number, event: any){
    this.items[index]['format'] = event.target.value;
    this.onConfig.emit(this.items);
  }

  removeItem(index: number){
    this.items.splice(index, 1);
    this.onConfig.emit(this.items);
  }

  onDrop(event: CdkDragDrop<Object[]>){
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);     
    this.onConfig.emit(this.items);
  }

  showConfigs(){
    this.hidden = !this.hidden;
    return false;
  }

  onClose(){
    this.alert.hidden = true
    this.hidden = true;
  }

  delete(){
    this.onDelete.emit(this.list_selected)
  }  

  exportAsXLSX() {
    this.onExport.emit()
    return false;
  }
}
