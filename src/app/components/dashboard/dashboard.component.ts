import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  breadcrumb = [{ name: 'Dashboard' }];
  title = 'Dashboard Management';
  constructor() { }

  ngOnInit(): void {
  }

}
