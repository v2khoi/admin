import { Component, OnInit, Output, ViewChildren, EventEmitter, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  @ViewChildren('closebutton') closebutton: any;
  @Input() currentId: any;
  @Input() modal: any;
  // @Input() key_name: any;
  
  alert = {
    hidden: true,
    type: 'success',
    message: 'Thành công'
  }

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {}

  transform(v: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}
