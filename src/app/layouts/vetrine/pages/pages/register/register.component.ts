import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { OffersModel } from 'src/app/models/offers.model';
import { AuthService } from 'src/app/services/auth.service';
import { OffersService } from 'src/app/services/offers.service';
import * as moment from 'moment';
import Swal from 'sweetalert2'

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
  constructor(private formBuilder: FormBuilder ,private offreService : OffersService  , private authService : AuthService , private router: Router) { }

  ngOnInit() {
	this.getOffreList() ;
	this.registerForm = this.formBuilder.group({
	  nomSalle: ['', [Validators.required]],
	  adresseSalle: [''],
	  urlFacebookSalle: [''],
	  jourConge: ['', [Validators.required]],
	  codeFiscal: ['', [Validators.required]],
	  description: [''],
	  lastname  :['', [Validators.required]],
	  firstname:['', [Validators.required]],
	  numroTel: ['', [Validators.required,  Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    addressDirector:[''],
	  emailDirector : ['', [Validators.required, Validators.email]],
	  passwordDirector:['', [Validators.required]],
	  offreId:['', [Validators.required]],
	});
  }

  get f() { return this.registerForm.controls; }

  getOffreList() {
    this.offreService.getAlOffers('1').subscribe((res:any)=>{
		res.data.forEach(e => {
			if(e.status) {
				this.offreList.push(e);
			}
		});
	  })
  }

  getUnit(unit : string) {
     if(unit === 'day') { return 'jours' ;}
	 if(unit === 'month') { return 'mois' ;}
	 if(unit === 'year') { return 'ann??e' ;}
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

   //Date End
	onChange(value) {
		this.offreId = value ;
		this.offreList.forEach((e:any) => {
			if(e.id == value) {
              const dt = this.DateEnd.getTime() + 3 ;
			  this.DateEnd = new Date(dt)
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
			phone : this.registerForm.value.numroTel ,
			name: this.registerForm.value.nomSalle,
			description:this.registerForm.value.description,
			code_fiscal: this.registerForm.value.codeFiscal,
			logo: this.urlSallePath,
			vacation_day: this.registerForm.value.jourConge,
			url_fcb: this.registerForm.value.urlFacebookSalle,
			start_at: moment(date).format('YYYY-MM-DD'),
			payment_receipt: this.urlPayment,
			offer_id:Number(this.offreId),
		}

		  this.submitted = true;
		 if (this.registerForm.invalid) {
		 	return;
		 }
		 this.authService.register(this.registerObject)
		 .pipe(first())
		 .subscribe(
		 	(res :any) => {
			 if(res.success){
				Swal.fire(
					'Abonnement	!',
					'votre Abonnement a ??t?? effectu??e avec succ??s.',
					'success'
				  )
			 }
		 	},
		 	error => {
				Swal.fire(
					'Abonnement	!',
					`<b>Erreur :</b> ${error}` ,
					'error'
				  )
		 	});

	}

}
