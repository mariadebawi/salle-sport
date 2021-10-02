import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ManagerModel } from 'src/app/models/gym.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.scss']
})
export class ManagerProfileComponent implements OnInit {
  me:ManagerModel;
  photoProfile :any ;
  msg ="" ;
  urlPhotot ="" ;
  adminProfile: FormGroup;
  submitted = false;
  passwordType = 'password';

  constructor(private formBuilder: FormBuilder , private profileService :ProfileService   ,private authService : AuthService ) { }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('currentUser')) ;

    this.photoProfile=  this.getImage(this.me.photo)  ;

      this.adminProfile = this.formBuilder.group({
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        address: [''],
        phone: ['', [Validators.required,  Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        oldPassword: [''],
        newPassword: [''],
      })
    }

  get f() { return this.adminProfile.controls; }


  ShowPassword() {
    if (this.passwordType === 'password') {
        this.passwordType = 'text';
    } else {
        this.passwordType = 'password';
    }
}

  getImage(photo:string) {
    if(photo == null || !photo || photo ===""  ){
      return 'https://cdn1.benouaiche.com/wp-content/uploads/2018/12/homme-medecine-chirurgie-esthetique-dr-benouaiche-paris.jpg'
    }else {
      return photo
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

  updateProfile() {
    this.submitted = true;
    this.profileService.updateProfileFunction(this.me.role ,this.adminProfile ,'updateAdmin' ,this.urlPhotot  )
      .subscribe(
        (res : any) => {
          if(res.success) {
            Swal.fire(
              'Modification!',
              'Modification de profile est effectuée avec succées',
              'success'
            )
            localStorage.removeItem('currentUser')
            localStorage.setItem('currentUser', JSON.stringify(res.data));
          }
        },
        error => {
          Swal.fire(
            'Modification!',
            `<b>Erreur :</b> ${error}` ,
            'error'
            )
        });


}

}
