import { Component, OnInit } from '@angular/core';
import {OffersService} from "../../../../../services/offers.service";
import {OffersModel} from "../../../../../models/offers.model";
@Component({
  selector: 'app-list-of',
  templateUrl: './list-of.component.html',
  styleUrls: ['./list-of.component.scss']
})
export class ListOfComponent implements OnInit {
ListOffers:OffersModel;
  constructor(private _OfferSer:OffersService) { }

  ngOnInit(): void {
    this.getListOffer();
  }
  getListOffer()
  {
    this._OfferSer.getAlOffersList().subscribe((res : any) =>{
      this.ListOffers=res.data;
  })
  }
  //
}
