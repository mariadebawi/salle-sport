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
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder , private authService : AuthService ,  private route: ActivatedRoute, private router: Router, ) {
    if (this.authService.currentUserValue) {
      console.log(this.authService.currentUserValue);
      this.router.navigate(['/']);
  }
   }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
        //  password: ['', [Validators.required, Validators.minLength(6)]],
      });

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  login() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {        
          return;
      }
      this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.error = error;
          });
}
  
}
  


