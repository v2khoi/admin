import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as FORMAT from '../../utils/format.util'

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class XlsxService {
  xportAsExcelFile(datas: any[], headers: any[], excelFileName: string, sheetName: string = 'data'): void {
    let headerKey: any = [];
    let headerValue: any = [];
    headers.forEach((x) => { 
      if(x.export){
        headerKey.push({key: x.key, format: x.format}) 
        headerValue.push(x.value)
      }
    })
    const datasBuild = datas.map((x) => headerKey.map((e: any) => FORMAT.formatContent(x[e.key], e.format)))
    datasBuild.unshift(headerValue)
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datasBuild, { skipHeader: true});
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: [sheetName]};
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }
}
