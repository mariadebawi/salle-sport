import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder , private authService : AuthService ,  private route: ActivatedRoute, private router: Router, ) {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this.wichRoute(JSON.parse(localStorage.getItem('currentUser')))
    }
   }


   wichRoute(currentUser) {
           if (currentUser  && currentUser.role === "admin") {
                 this.router.navigate(['/admin']);
             }else if(currentUser && currentUser.role === "manager") {
                 this.router.navigate(['/manager']);
            }else {
                this.router.navigate(['/login']);
             }
   }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
        //  password: ['', [Validators.required, Validators.minLength(6)]],
      });
     // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {return;}
      this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
            this.wichRoute(data.data.user)
          },
          error => {
              this.error = error;
          });
}
}


