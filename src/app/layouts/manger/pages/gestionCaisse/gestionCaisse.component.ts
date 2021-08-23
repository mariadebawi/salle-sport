import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { ManagerModel } from 'src/app/models/gym.model';
import { SubscriptionAdherent } from 'src/app/models/SubscriptionAdherent.model';
import { StatsService } from 'src/app/services/stats.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionCaisse',
  templateUrl: './gestionCaisse.component.html',
  styleUrls: ['./gestionCaisse.component.scss']
})
export class GestionCaisseComponent implements OnInit {
  cards =[] ;  listOffre =[] ; listCoch=[]
  page='1' ;  config: any;closeResult;	submitted = false;
	returnUrl: string;
	error = '';
  configg = {
    value: false,
    name: "",
    disabled: false,
    height: 25,
    width: 50,
    margin: 3,
    fontSize: 10,
    speed: 300,
    color: {
      checked: "#56C128",
      unchecked: "#dcdcdc"
    },
    switchColor: {
      checked: "#3366FF",
      unchecked: "crimson"
    },
    labels: {
      unchecked: "off",
      checked: "on"
    },
    checkedLabel: "",
    uncheckedLabel: "",
    fontColor: {
      checked: "#fafafa",
      unchecked: "#ffffff"
    }
  };
  subForm: FormGroup;
  offf : SubscriptionAdherent ;
  currentUser:ManagerModel ; adherentEfffect:ManagerModel ;adherentName=''
  public labels: any = {
    previousLabel: '&nbsp;',
    nextLabel: '&nbsp;',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
 };
  allSubscriptions :SubscriptionAdherent[]
  constructor( private statis : StatsService , private serviceSub : SubscriptionsService  
    ,private formBuilder: FormBuilder ,
    private modalService: NgbModal , ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) ;

    this.getStatistique() ; 
    this.getListSubscription(this.page) ;
    this.subForm = this.formBuilder.group({
      offreId:['', [Validators.required]],
      start_at :['', [Validators.required]],
      end_at:['', [Validators.required]],
      adherentId:['', [Validators.required]],
    });
    }
  
    get f() { return this.subForm.controls; }



  getStatistique() {
    this.statis.getStatiSubsManager().subscribe((res:any)=>{
      this.cards = res.data.cards ;
      this.listOffre = res.data.list_offers ;
      this.listCoch = res.data.list_coachs ;
    })
  }

  getListSubscription(page) {
    this.serviceSub.getSubscriptiolsListManager(page).subscribe((res:any)=>{
      this.allSubscriptions=res.data.list;
      this.config = {
       itemsPerPage: 10,
       currentPage: 1,
      totalItems: res.data.total
     };
      })
 }


 getDate(date) {
  return moment(date).format('DD-MM-YYYY')
}

getStatus(status : boolean){
  if(status) {
    return 'disponible'
  }else {
    return 'pas disponible'
  }
}


changeStatus(id,status) {
  if(!status) {
    Swal.fire({
      title: 'Vous êtes sur ?',
      text: "vous êtes sur de bloquer cette subscription ?!!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Non',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceSub.changeStatusCaisse(id, status).subscribe((res: any) => {
          this.getListSubscription(this.page) ;
          });
        Swal.fire(
          'Bloqué!',
          'cette subscription est bloqué.',
          'success'
        )
      }
    })
  }
  else {
    this.serviceSub.changeStatusCaisse(id, status).subscribe((res: any) => {
      this.getListSubscription(this.page) ;
      });
  }
  
}



open(content , subscription ?:SubscriptionAdherent ) {
   if(subscription) {
     this.offf = subscription ;
     this.adherentEfffect = subscription.adherent ;
     this.adherentName =this.adherentEfffect.first_name + ' ' +this.adherentEfffect.last_name ;
     this.subForm.value.adherentId = this.adherentEfffect.id ;
   }

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



effectuerOffre(){
  this.submitted = true;
  if (this.subForm.invalid) {
    return;
  }
  if(this.subForm.value.end_at < this.subForm.value.start_at ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'la date de fin doit etre superieur a date de début ',
    })
  }else {
     const offreAdherent = {
      type_subscriptions_id:this.subForm.value.offreId,
      start_at: this.subForm.value.start_at,
      end_at:this.subForm.value.end_at ,
      adherent_id : this.adherentEfffect.id ,
     }

     this.serviceSub.effectuerOffre(offreAdherent)
     .pipe(first())
     .subscribe(
       (res :any) => {
         if(res.success){
           this.getListSubscription(this.page) ;
           Swal.fire(
             'Effecter	!',
             'ofOre de Votre adherent ' +this.adherentName + ' a eté modifier avec succées',
             'success'
           )
         }
       },
       error => {
         Swal.fire(
           'Abonnement	!',
           `erreur : ${error}` ,
           'error'
         )
       });

  }
}


modifierOffre() {
this.submitted = true;
if (this.subForm.invalid) {
  return;
}
if(this.subForm.value.end_at < this.subForm.value.start_at ) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'la date de fin doit etre superieur a date de début ',
  })
}else {
   const offreAdherent = {
    type_subscriptions_id:this.subForm.value.offreId,
    start_at: this.subForm.value.start_at,
    end_at:this.subForm.value.end_at ,
    adherent_id : this.adherentEfffect.id ,
   }

   this.serviceSub.updateOffre(offreAdherent , this.offf.id)
   .pipe(first())
   .subscribe(
     (res :any) => {
       if(res.success){
         localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
         this.getListSubscription(this.page) ;
         Swal.fire(
           'Effecter	!',
           'Votre adherent ' +this.adherentName + ' a maintenant une offre ',
           'success'
         )
       }
     },
     error => {
       Swal.fire(
         'Abonnement	!',
         `erreur : ${error}` ,
         'error'
       )
     });

}
}

}
