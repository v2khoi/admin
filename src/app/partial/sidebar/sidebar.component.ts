import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { StackedMenu } from 'stacked-menu'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(private _router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // const menu = new StackedMenu()
  }
  ngOnChanges(changes: SimpleChanges): void{}

  nightMode(){
    localStorage.setItem('skin', localStorage.getItem('skin')=='dark'?'default':'dark');
    location.reload(); 
  }
}
