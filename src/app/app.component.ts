import { Component } from '@angular/core';
import { AuthenticationService } from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app-admin';
  currentUser = {};

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {    
    this.currentUser = JSON.parse(localStorage.getItem('currentUserData') || '{}');
  }
}
