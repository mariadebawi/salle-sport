import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { OffersModel } from 'src/app/models/offers.model';
import { AuthService } from 'src/app/services/auth.service';
import { OffersService } from 'src/app/services/offers.service';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	urlSalle: any;
	urlDirector:any;
	urlpayment_receipt:any;
	msg = "";
	offreList : OffersModel[] = [] ;
	registerForm: FormGroup;
	submitted = false;
	returnUrl: string;
	error = '';
    registerObject :any ;
	offreId:number; DateEnd = new Date();
	urlSallePath = ""
	avatarPath = ""
	urlPayment = ""
  constructor(private formBuilder: FormBuilder ,private offreService : OffersService  , private authService : AuthService , private router: Router,) { }

  ngOnInit() {
	  const date = new Date() ;
	  console.log(moment(date).format('YYYY-MM-DD'));


	this.getOffreList() ;
	this.registerForm = this.formBuilder.group({
	  nomSalle: ['', [Validators.required]],
	  adresseSalle: ['', [Validators.required]],
	  urlFacebookSalle: [''],
	  jourConge: ['', [Validators.required]],
	  codeFiscal: ['', [Validators.required]],
	  description: [''],
	  lastname  :['', [Validators.required]],
	  firstname:['', [Validators.required]],
	  numroTel:['', [Validators.required]],
	  addressDirector:['', [Validators.required]],
	  emailDirector : ['', [Validators.required, Validators.email]],
	  passwordDirector:['', [Validators.required]],
	  offreId:['', [Validators.required]],
	});
  }

  get f() { return this.registerForm.controls; }

  getOffreList() {
    this.offreService.getAlOffers().subscribe((res:any)=>{
		res.data.forEach(e => {
			if(e.status) {
				this.offreList.push(e);
			}
		});
	  })
  }
  getUnit(unit : string) {
     if(unit === 'day') { return 'jours' ;}
	 if(unit === 'mouth') { return 'mois' ;}
	 if(unit === 'year') { return 'année' ;}
  }
	selectFile(event: any) {
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
            this.urlSallePath = res.data.path ;
         });


		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
            this.urlSalle= reader.result;
		}
	}

  selectFilePreview(event: any) {
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
            this.avatarPath = res.data.path
         });

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
      this.urlDirector= reader.result;
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
            this.urlPayment = res.data.path
         });

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
		 this.msg = "";
         this.urlpayment_receipt= reader.result;
		}
	}


	onChange(value) {
		this.offreId = value ;
		this.offreList.forEach(e => {
			if(e.id == value) {
			   this.DateEnd.setTime(this.DateEnd.getTime() +  (e.duration * 24 * 60 * 60 * 1000));
			}
		  })
	}

	register() {
		const date = new Date()
		this.registerObject = {
			first_name: this.registerForm.value.firstname,
			last_name: this.registerForm.value.lastname,
			password: this.registerForm.value.passwordDirector,
			email: this.registerForm.value.emailDirector,
		    address: this.registerForm.value.addressDirector,
			addressGym: this.registerForm.value.urlSalle,
			photo: this.avatarPath,
			name: this.registerForm.value.nomSalle,
			description:this.registerForm.value.description,
			code_fiscal: this.registerForm.value.codeFiscal,
			logo: this.urlSallePath,
			vacation_day: this.registerForm.value.jourConge,
			url_fcb: this.registerForm.value.urlFacebookSalle,
			start_at: moment(date).format('YYYY-MM-DD'),
			end_at:   moment(this.DateEnd).format('YYYY-MM-DD'),
			payment_receipt: this.urlPayment,
			offer_id:Number(this.offreId),
		}

		  this.submitted = true;
		 if (this.registerForm.invalid) {
		 	return;
		 }
		// console.log(this.registerObject);

		 this.authService.register(this.registerObject)
		 .pipe(first())
		 .subscribe(
		 	(res :any) => {
			 if(res.success){
				this.router.navigate(['/login']);
			 }
			 else {
				 console.log(res);

			 }
		 	},
		 	error => {
		 		this.error = error;
		 	});

	}

}
