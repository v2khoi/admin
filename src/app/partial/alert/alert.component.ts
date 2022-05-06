import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class AlertComponent implements OnInit {
  @Input() hidden = true;
  @Input() type = 'success';
  @Input() message = 'Thành công';

  constructor() { }

  ngOnInit(): void {
    
  }

}
