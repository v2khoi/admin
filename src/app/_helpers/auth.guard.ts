import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { User } from '../entities/user.entity';

import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true 
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['admin/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}