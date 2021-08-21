import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.scss']
})
export class AddEmpComponent implements OnInit {
  photoProfile :any ;
  msg ="" ;
  urlPhotot ="" ;
  employeProfile: FormGroup;
  submitted = false;
  passwordType = 'password';
  roleEmploye='coach';
  constructor(private formBuilder: FormBuilder , private profileService :ProfileService   ,private authService : AuthService ) { }

  ngOnInit(): void {
    this.employeProfile = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phone: ['', [Validators.required,  Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      password: [''],
    })
  }

   get f() { return this.employeProfile.controls; }


  reset(){
    this.employeProfile.reset() ;
  }

  changeRole(value){
    this.roleEmploye=value;

    if(this.roleEmploye !== 'secretary') {
      this.employeProfile.value.password = null;
      this.employeProfile.get('password').setValidators([]);
    } else {
      this.employeProfile.get('password').setValidators([
        Validators.required
    ]);
    }
   }

   ShowPassword() {
    if (this.passwordType === 'password') {
        this.passwordType = 'text';
    } else {
        this.passwordType = 'password';
    }
}

  selectFilePrevStyle(event){
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

		this.authService.uploadFile(event.target.files[0])
        .pipe(first())
        .subscribe((res: any) => {
            this.urlPhotot = res.data.path
         });

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
		 this.msg = "";
         this.photoProfile= reader.result;
		}
	}

  addEmploye() {
    this.submitted = true;

    this.profileService.updateProfileFunction(this.roleEmploye ,this.employeProfile , 'addEmployer',this.urlPhotot )
      .subscribe(
        (res :any) => {
          if(res.success){
            Swal.fire(
              'Ajout	!',
              'l\'insertion est effectué avec success',
              'success'
            )
          }
        },
        error => {
          Swal.fire(
            'AJout	!',
            `erreur : ${error}` ,
            'error'
          )
        });

}



}
