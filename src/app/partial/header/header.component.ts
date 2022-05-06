import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserData, User } from '../../entities/user.entity';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser: User = {};

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {    
    this.currentUser = JSON.parse(localStorage.getItem('currentUserData') || '{}');
    // console.log(this.currentUser)
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['admin/login']);
  }

}
