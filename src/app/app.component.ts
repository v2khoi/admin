import { Component } from '@angular/core';
import { User } from './entities/user.entity';
import { AuthenticationService } from './services/auth/authentication.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app-admin';

  // public constructor(  
  //   private currentUser: User,
  //   // private router: Router,
  //   private authenticationService: AuthenticationService
  // ){
  //   this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  // }

  // ngOnInit(){}
}
