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
  cards =[] ;  list_subscriptions =[] ; listCoch=[] ; dherentList=[]
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
  offf ;
  filters : { type_subscriptions_id? : number  , coach_id? : number ; phone? :number} = { type_subscriptions_id : 1  , coach_id : 1 , phone :1};
  type_subscriptions_id=0; coach_id=0;  phone=0;

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
    this.filter()
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) ;
    this.getListSubscription(this.page) ;
    this.getStatistique() ;
    this.subForm = this.formBuilder.group({
      offreId:['', [Validators.required]],
      start_at :['', [Validators.required]],
      adherentId:['', [Validators.required]],
    });
    }

    get f() { return this.subForm.controls; }



  getStatistique() {
    this.statis.getStatiSubsManager().subscribe((res:any)=>{
      this.cards = res.data.cards ;
      this.list_subscriptions = res.data.list_subscriptions ;
      this.listCoch = res.data.list_coachs ;
      this.dherentList = res.data.list_adherents ;

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

  changeCoachs(salle) {
    this.coach_id = Number(salle) ;
    this.chercher( 'coach_id' ,this.coach_id)
  }

  changeOffres(idOffre) {
    this.type_subscriptions_id= Number(idOffre)
    this.chercher( 'type_subscriptions_id', this.type_subscriptions_id)

  }


  refresh() {
    this.ngOnInit() ;
  }

  AjouterAdherent(){
    this.submitted = true;
    if (this.subForm.invalid) {
      return;
    }

    else {
      const adherent = {
        type_subscriptions_id:this.subForm.value.offreId,
        start_at: this.subForm.value.start_at,
        adherent_id:this.subForm.value.adherentId,

      }

      this.serviceSub.addAdherent(adherent)
        .pipe(first())
        .subscribe(
          (res :any) => {
            if(res.success){
              this.getListSubscription(this.page) ;
              Swal.fire(
                'Ajout	!',
                'cet abonnement est effectué avec success',
                'success'
              )
            }
          },
          error => {
            Swal.fire(
              'Ajout!',
              `erreur : ${error}` ,
              'error'
            )
          });

    }
  }



  getUnit(unit : string) {
    if(unit === 'day') { return 'jours' ;}
    if(unit === 'month') { return 'mois' ;}
    if(unit === 'year') { return 'année' ;}
  }


  filter() {
      this.filters.type_subscriptions_id = null;
      this.filters.coach_id = null;
      this.filters.phone = null;
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


  chercher(name : string , value : any) {
    if(name === 'type_subscriptions_id') {
      this.filters.type_subscriptions_id = value
    }
    if(name === 'coach_id') {
      this.filters.coach_id = value
    }
    if(this.phone) {
      this.filters.phone = this.phone
    }

    this.serviceSub.getSubscriptiolsListManager(this.page  , this.filters).subscribe((res:any)=>{
      this.allSubscriptions=res.data.list;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: res.data.total
      };
    })
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



modifierOffre() {
this.submitted = true;
if (this.subForm.invalid) {
  return;
}
else {
   const offreAdherent = {
    type_subscriptions_id:this.subForm.value.offreId,
    start_at: this.subForm.value.start_at,
    adherent_id : this.adherentEfffect.id ,
   }

   this.serviceSub.updateOffre(offreAdherent , this.offf.id)
   .pipe(first())
   .subscribe(
     (res :any) => {
       if(res.success){
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

  getPage(p) {
    this.page = p.toString();
    this.getListSubscription(this.page)
  }





}
