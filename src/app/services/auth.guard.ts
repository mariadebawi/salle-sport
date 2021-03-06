import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
    ) { }

    canActivate() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));        
        if (currentUser ) {            
            return true;
        }else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}