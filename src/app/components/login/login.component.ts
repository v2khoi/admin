// import { PageService } from './../../services/page/page.service';
import { AuthenticationService } from './../../services/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl = "";
  error = '';

  constructor(
    private loginForm: FormGroup,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    // private PageService: PageService
  ) { 
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/admin']);
    }
  }

  ngOnInit() {
    // this.PageService.setHeader("ad_login");
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe((data) => {      
        if(data.statusCode == 200){
          this.router.navigate([this.returnUrl]);
        }else{
          this.error = data.message;
          this.loading = false;
        }
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

}
