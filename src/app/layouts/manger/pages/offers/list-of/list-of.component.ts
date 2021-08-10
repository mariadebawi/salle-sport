import { Component, OnInit } from '@angular/core';
import {OffersService} from "../../../../../services/offers.service";
import {OffersModel, TypeSubscriptionModel} from "../../../../../models/offers.model";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-of',
  templateUrl: './list-of.component.html',
  styleUrls: ['./list-of.component.scss']
})
export class ListOfComponent implements OnInit {
  ListTypeSub:TypeSubscriptionModel[];
  closeResult = '';
  page="1" ;
   config: any;
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
  constructor(private _OfferService:OffersService) { }

  ngOnInit(): void {
    this.getListOffer();
  }
  getListOffer()  {
    this._OfferService.getAllTypeSubscription().subscribe((res : any) =>{
      this.ListTypeSub=res.data.list;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
       totalItems: this.ListTypeSub.length
      };
  })
  }

  getUnit(unit : string) {
    if(unit === 'day') { return 'jours' ;}
  if(unit === 'month') { return 'mois' ;}
  if(unit === 'year') { return 'année' ;}
 }
  

 changeStatus(id,status) {
  if(status) {
    Swal.fire({
      title: 'Vous êtes sur ?',
      text: "vous êtes sur de bloquer cet offre ?!!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Non',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this._OfferService.changeStatusTypeSub(id, status).subscribe((res: any) => {
          this.getListOffer();
          });
        Swal.fire(
          'Bloqué!',
          'cet offre est bloqué.',
          'success'
        )
      }
    })
  }
  else {
    this._OfferService.changeStatus(id, status).subscribe((res: any) => {
      this.getListOffer();
      });
  }
  
}

getStatus(status : boolean){
  if(status) {
    return 'disponible'
  }else {
    return 'pas disponible'
  }
}


}
