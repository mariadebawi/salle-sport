import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SubscriptionAdherent } from 'src/app/models/SubscriptionAdherent.model';
import { StatsService } from 'src/app/services/stats.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  page='1';
  allSubscriptions:SubscriptionAdherent[];
  config: any;
  listGym=[] ;
  listOffre =[] ;
  cards =[] ;listCarts ;
  filters : { salleName? : number  , status? : string ; offreId? :number} = { salleName : 1  , status : 'en attente' , offreId :1}; salleName=0; status='';  offreId=0;

  constructor( private serviceSub : SubscriptionsService , private serviceStat : StatsService) { }

  ngOnInit() {
    this.filter() ;
    this.getListSubscription(this.page) ;
    this.getStatistique()
  }


  filter() {
    this.serviceSub.getFilter().subscribe((res:any)=>{
      this.listCarts=res.data.cards;
      this.listGym = res.data.list_gyms ;
      this.listOffre = res.data.list_offers ;
      this.filters.salleName = null;
      this.filters.offreId = null;
      this.filters.status = null;

    })
  }

  getStatistique() {
    this.serviceStat.getAdminStats().subscribe((res:any)=>{
      this.cards = res.data.cards ;

    })
  }

  findBySatus(status) {
     this.status = status;
     this.chercher( 'status' , this.status)
  }

  findBySalleName(salle) {
     this.salleName = Number(salle) ;
    this.chercher( 'salleName' ,this.salleName)

  }



  findByOffreName(idOffre) {
    this.offreId= Number(idOffre)
    this.chercher( 'offreId', this.offreId)

  }

  refresh() {
    this.ngOnInit() ;
  }

  chercher(name : string , value : any) {
    if(name === 'status') {
      this.filters.status = value
    }
    if(name === 'offreId') {
      this.filters.offreId = value
    }
    if(name === 'salleName') {
      this.filters.salleName = value
    }
    this.serviceSub.getSubscriptiolsList(this.page , this.filters).subscribe((res:any)=> {
      console.log('res',res)
      this.allSubscriptions=res.data.list;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.allSubscriptions.length
      };
    })
  }

  getListSubscription(page) {

     this.serviceSub.getSubscriptiolsList(page).subscribe((res:any)=>{
       this.allSubscriptions=res.data.list;
console.log(this.allSubscriptions)
       this.config = {
        itemsPerPage: 10,
        currentPage: 1,
       totalItems:res.data.total
      };
       })
  }

  getDate(date) {
    return moment(date).format('DD-MM-YYYY')
  }

  getPage(p) {
    this.page = p.toString();
    this.getListSubscription(this.page) ;
  }

  showRecu(photo) {

    if(photo == null || !photo || photo ===""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Aucun Payement Reçu',
      })
    } else {
      Swal.fire({
        imageUrl: photo,
        imageHeight: 500,
        imageAlt: 'A tall image'
      })
    }

  }


  changeSatus(id , status) {
    if(status == 'refuser') {
      Swal.fire({
        title: 'Vous êtes sur ?',
        text: "vous êtes sur de refuser cette subscription ?!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Non',
        cancelButtonColor: '#d33',
        confirmButtonText: 'oui'
      }).then((result) => {
        if (result.isConfirmed) {
          this.serviceSub.changeStatusSub(id , status).subscribe((res: any) => {
            this.getListSubscription(this.page) ;
            });
          Swal.fire(
            'Refusée!',
            'cette subscription est refusée.',
            'success'
          )
        }
      })
    }
    else {
      this.serviceSub.changeStatusSub(id , status).subscribe((res: any) => {
        this.getListSubscription(this.page) ;
        });
        Swal.fire(
          'Accepte!',
          'cette subscription  est acceptée.',
          'success'
        )
    }
  }


}
