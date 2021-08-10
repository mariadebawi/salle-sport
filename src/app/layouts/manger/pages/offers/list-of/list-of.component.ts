import { Component, OnInit } from '@angular/core';
import {OffersService} from "../../../../../services/offers.service";
import {OffersModel} from "../../../../../models/offers.model";
@Component({
  selector: 'app-list-of',
  templateUrl: './list-of.component.html',
  styleUrls: ['./list-of.component.scss']
})
export class ListOfComponent implements OnInit {
  ListTypeSub:OffersModel;
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
  getListOffer()
  {
    this._OfferService.getAllTypeSubscription().subscribe((res : any) =>{
      this.ListTypeSub=res.data.list;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
      // totalItems: this.ListTypeSub.length
      };
  })
  }
}
