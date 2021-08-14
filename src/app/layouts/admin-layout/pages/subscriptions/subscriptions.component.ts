import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SubscriptionAdherent } from 'src/app/models/SubscriptionAdherent.model';
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
  filters : { salleName : number , status : string ; offreId :number} ; salleName=0; ; status=''; ; offreId=0;
  constructor( private serviceSub : SubscriptionsService) { }

  ngOnInit() {
    this.filter() ;
    this.getListSubscription(this.page) ;
  }

  
  filter() {
    this.serviceSub.getFilter().subscribe((res:any)=>{      
      this.listGym = res.data.list_gyms ;
      this.listOffre = res.data.list_offers ;      
      
    })
  }

  findBySatus(status) {
     this.status = status;
     this.filters.status =status 
    
  }

  findBySalleName(salle) {    
     this.salleName = Number(salle) ; 
    this.filters.salleName = Number(salle) ;
  }


  
  findByOffreName(idOffre) {
    this.offreId= Number(idOffre)
      this.filters.offreId = Number(idOffre)
}


  chercher() {
    console.log(this.filters);
    
    console.log(this.salleName);
    console.log(this.offreId);
    console.log(this.status);

    
    
  }
  
  getListSubscription(page) {  
  
    // if(this.filters) {
       this.serviceSub.getSubscriptiolsList(page).subscribe((res:any)=>{
       this.allSubscriptions=res.data.list;
       this.config = {
        itemsPerPage: 10,
        currentPage: 1,
       totalItems: this.allSubscriptions.length
      };
       })
      
    //  }else {
    //     this.serviceSub.getSubscriptiolsList(page).subscribe((res:any)=>{
    //       this.allSubscriptions=res.data.list;
    //       this.config = {
    //         itemsPerPage: 10,
    //         currentPage: 1,
    //        totalItems: this.allSubscriptions.length
    //       };
    //     })
       
    //   }
 
  }

  getDate(date) {
    return moment(date).format('DD-MM-YYYY')
  }
  
  showRecu(photo) {
    
    if(photo == null || !photo || photo ==="" || !photo.startsWith('http://localhost:8000') ){
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
