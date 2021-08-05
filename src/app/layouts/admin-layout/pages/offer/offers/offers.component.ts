import { Component, OnInit } from '@angular/core';
import {OffersService} from '../../../../../services/offers.service';
import { OffersModel } from 'src/app/models/offers.model';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
   allOffers:OffersModel[];
   page="1" ;
   config: any;
  public labels: any = {
      previousLabel: '&nbsp;',
      nextLabel: '&nbsp;',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  isLoading: Subject<boolean> = this.loaderService.isLoading;
 
  constructor(private _offersService:OffersService ,     private loaderService: LoaderService
    ) { }
  ngOnInit(): void {
    this.GetAllOffers();
  }

  GetAllOffers(){
    this._offersService.getAlOffers(this.page).subscribe((res:any)=>{
      this.allOffers=res.data;
  
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
       totalItems: this.allOffers.length
      };
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

 getPage(p) {   
  this.page = p.toString();
  }

}
