import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  BASEURL=environment.basUrl;
  constructor(private http: HttpClient) { }

  getSubscriptiolsList(page ,filters? ){
      const params = new HttpParams()
      //  .set('gym_id', filters?.salleName )
      //  .set('offer_id', filters?.offreId)
      //  .set('status', filters?.status)
      .set('page', page) ;
      return this.http.get(this.BASEURL+`cash_management`, { params: params } );
  }

  getFilter() {
    console.log('okkk');
    return this.http.get(this.BASEURL+`cash_management/get_settings`);
  }

  changeStatusSub(id , status) {
    return this.http.put(this.BASEURL+`cash_management/`+id+`/change_status`,  {status : status} );
  }



}
