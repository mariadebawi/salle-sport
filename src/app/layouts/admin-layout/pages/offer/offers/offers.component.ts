import { Component, OnInit } from '@angular/core';
import {OffersService} from '../../../../../services/offers.service';
import { OffersModel } from 'src/app/models/offers.model';
import * as moment from 'moment';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
   allOffers:OffersModel[];
  constructor(private _offersService:OffersService) { }
  ngOnInit(): void {
    this.GetAllOffers();
  }

  GetAllOffers()
  {
    this._offersService.getAlOffers().subscribe((res:any)=>{
      this.allOffers=res.data;
    // console.log(this.allOffers)
    })
  }

  changeStatus(id,status) {
    this._offersService.changeStatus(id, status).subscribe((res: any) => {
      this.GetAllOffers();
      });
  }

  getStatus(status : boolean){
     if(status) {
       return 'disponible'
     }else {
       return 'pas disponible'
     }
  }

  getDate(date) {
    return moment(date).format('DD-MM-YYYY')
  }


  getUnit(unit : string) {
    if(unit === 'day') { return 'jours' ;}
  if(unit === 'mouth') { return 'mois' ;}
  if(unit === 'year') { return 'année' ;}
 }

}
