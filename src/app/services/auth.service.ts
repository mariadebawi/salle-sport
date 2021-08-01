import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser:any;

  constructor(private http: HttpClient , private router: Router,) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

public get currentUserValue() {  
    return this.currentUser;
}

login(email, password) {  
    return this.http.post<any>(`${environment.basUrl}auth/login`, { email, password })
        .pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user.data.user));
            localStorage.setItem('token', user.data.token);
            return user;
        }));
}

logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
}

}
