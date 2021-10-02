import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { ManagerModel } from 'src/app/models/gym.model';
import { OffersModel } from 'src/app/models/offers.model';
import { subscriptionGym } from 'src/app/models/subscriptionsGym.model';
import { AuthService } from 'src/app/services/auth.service';
import { OffersService } from 'src/app/services/offers.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Renouvelement',
  templateUrl: './Renouvelement.component.html',
  styleUrls: ['./Renouvelement.component.scss']
})
export class RenouvelementComponent implements OnInit {
  
  ListManagerSub :subscriptionGym[];
  config;
  currentUser : ManagerModel ;
  closeResult = ''; isRvl=false ;
  page="1" ;dateFin ;
	urlpayment_receipt:any;
	msg = "";
	offreList : OffersModel[] = [] ;
	renouvellementForm: FormGroup;
	submitted = false;
	returnUrl: string;
	error = ''; dateNow = new Date() ;
    registerObject :any ;
	offreId:number; DateEnd = new Date();
	urlPayment = ""
  constructor( private subrip: SubscriptionsService ,private formBuilder: FormBuilder ,
    private offreService : OffersService  ,
    private modalService: NgbModal , 
    private authService : AuthService ) { }

  ngOnInit() {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) ;
   this.getListSub() ;
    this.getOffreList() ;
    this.renouvellementForm = this.formBuilder.group({
      offreId:['', [Validators.required]],
      start_at :['', [Validators.required]],
      end_at:['', [Validators.required]],
    });

    }
  
    get f() { return this.renouvellementForm.controls; }
  
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
     if(unit === 'year') { return 'année' ;}
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


  getListSub() {
    this.subrip.getSubscriptionManagerList().subscribe((res : any) =>{
      this.ListManagerSub=res.data.list;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
       totalItems: res.data.total
      };
      this.ListManagerSub.forEach((e:any) => {    
        if( e.gym_id === this.currentUser.gym_id ) {        
          this.dateFin =  e.end_at ;
          this.isRvl = moment(this.dateNow).isAfter( e.end_at);
        }
   });
  })
  }


 getDate(date) {
  return moment(date).format('DD-MM-YYYY')
}
 

open(content) {

  this.modalService.open(content).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
  

renouveller(){
  this.submitted = true;
  if (this.renouvellementForm.invalid) {
    return;
  }
  if(this.renouvellementForm.value.end_at < this.renouvellementForm.value.start_at ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'la date de fin doit etre superieur a date de début ',
    })
  }
  else {
     const renouvelle = {
      offer_id:this.renouvellementForm.value.offreId,
      start_at: this.renouvellementForm.value.start_at,
      end_at:this.renouvellementForm.value.end_at ,
      payment_receipt:  this.urlPayment,
     }

     this.subrip.renouvellerOff(renouvelle)
     .pipe(first())
     .subscribe(
       (res :any) => {
         if(res.success){
           this.getListSub() ;
           Swal.fire(
             'Renouvellement	!',
             'Votre renouvellement est effectué avec success',
             'success'
           )
           this.isRvl= true ;
         }
       },
       error => {
         Swal.fire(
           'Abonnement!',
           `erreur : ${error}` ,
           'error'
         )
       });

  }
}

}
