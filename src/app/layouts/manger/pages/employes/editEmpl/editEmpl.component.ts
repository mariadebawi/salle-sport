import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ManagerModel } from 'src/app/models/gym.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editEmpl',
  templateUrl: './editEmpl.component.html',
  styleUrls: ['./editEmpl.component.scss']
})
export class EditEmplComponent implements OnInit {
  photoProfile :any ;
  msg ="" ;  
  employUpdated:ManagerModel;
  urlPhotot ="" ;
  employeProfile: FormGroup;
  submitted = false;
  passwordType = 'password';
  roleEmploye='coach';
  id:number;
  constructor(private formBuilder: FormBuilder , private serviceEmploy :ProfileService   ,private authService : AuthService  ,  private _route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = +params.id;
    });
    this.getEditedEmply(this.id)

    this.employeProfile
     = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phone: [''],
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

  getEditedEmply(id){
    this.serviceEmploy.getEmployById(id).subscribe((res : any) =>{
      this.employUpdated=res.data;
      this.urlPhotot=this.employUpdated?.photo;
      if(this.employUpdated?.role == 'secretary') {
        this.employeProfile.get('role').disable();
      } else {
        this.employeProfile.get('role').enable()
      }
    })
  }

  getImage(photo:string) {
    if(photo == null || !photo || photo ==="" || !photo.startsWith('https://cdn1.benouaiche.com/wp-content/uploads') ){
      return 'https://cdn1.benouaiche.com/wp-content/uploads/2018/12/homme-medecine-chirurgie-esthetique-dr-benouaiche-paris.jpg'
    }else {
      return photo
    }
  }

  UpdateEmploye(){
    this.submitted = true;
  
    this.serviceEmploy.updateProfileFunction(this.roleEmploye ,this.employeProfile , 'ediyEmploy' ,this.urlPhotot  , this.id)
      .subscribe(
        (res :any) => {
          if(res.success){
            Swal.fire(
              'Modification	!',
              'la Modification est effectué avec success',
              'success'
            )
          }
        },
        error => {
          Swal.fire(
            'Modification	!',
            `erreur : ${error}` ,
            'error'
          )
        }); 
  }
}
