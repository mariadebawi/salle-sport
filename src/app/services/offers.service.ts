import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import { OffersModel } from '../models/offers.model';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  BASEURL=environment.basUrl;
  constructor(private http: HttpClient) { }

  getAlOffersList() { return this.http.get(this.BASEURL+`offers`); }
  add(data:any) {return this.http.post<any>(this.BASEURL+`offers`, data);}
 // getAllActivites() { return this.http.get(this.BASEURL+`activities?list=1`); }
 //changeStatus(id,status) {return this.http.put(this.BASEURL+`offers`+'/change_status/'+id,{'status':status});}
  //getAlOffers() { return this.http.get(this.BASEURL+`offers`); }
 // add(data:any) {return this.http.post<any>(this.BASEURL+`offers`, data);}


  getAllActivites() { return this.http.get(this.BASEURL+`activities?list=1`); }

  getAlOffers(page:string) {
    let params = new HttpParams().set('page', page);
    return this.http.get(this.BASEURL+`offers/`, { params: params } );
  }

  addNewTypeSubscription(data:any) {return this.http.post<any>(this.BASEURL+`types_subscriptions`, data) }


  getAllTypeSubscription(page) {
    let params = new HttpParams().set('page', page);
    return this.http.get(this.BASEURL+`types_subscriptions` , {params:params}); }

  changeStatus(id,status)
  {
    return this.http.put(this.BASEURL+`offers`+'/'+id+'/change_status',{'status':status});
  }

  changeStatusTypeSub(id,status)
  {
    return this.http.put(this.BASEURL+`types_subscriptions/`+id,{'status':status});
  }

  updateTypeSub(id,data)
  {
    return this.http.put(this.BASEURL+`types_subscriptions/`+id,data);
  }

  addNewOffre(newOffre)
  { return this.http.post(this.BASEURL+`offers` , newOffre);
  }

  updateOffre(OffreUpdated , id:number) {
    return this.http.put(this.BASEURL+`offers/`+id,OffreUpdated);
  }

  getTypeSubscrptionById(id:number) {
    return this.http.get(this.BASEURL+`types_subscriptions/`+id);
  }

}

