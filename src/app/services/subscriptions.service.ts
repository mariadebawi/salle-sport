import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  BASEURL=environment.basUrl;
  constructor(private http: HttpClient) { }

  getSubscriptiolsList(page ,filters? ) {
    if (!filters) {
      const params = new HttpParams()
        .set('page', page);
      return this.http.get(this.BASEURL + `cash_management`, {params: params});
    } else {
     const paramss = new HttpParams()
       .set('gym_id', filters.salleName)
       .set('offer_id', filters.offreId)
       .set('status', filters.status)
       .set('page', page);
        return this.http.get(this.BASEURL + `cash_management`, {params: paramss});
      }

      

    }


    getSubscriptiolsListManager(page ,filters? ) {
      if (!filters) {
        const params = new HttpParams()
          .set('page', page);
        return this.http.get(this.BASEURL + `subscriptions`, {params: params});
      } else {
       const paramss = new HttpParams()
         .set('gym_id', filters.salleName)
         .set('offer_id', filters.offreId)
         .set('status', filters.status)
         .set('page', page);
          return this.http.get(this.BASEURL + `cash_management`, {params: paramss});
        }

  }


  getFilter() {
    return this.http.get(this.BASEURL+`cash_management/get_settings`);
  }

  changeStatusSub(id , status) {
    return this.http.put(this.BASEURL+`cash_management/`+id+`/change_status`,  {status : status} );
  }

  changeStatusCaisse(id , status) {
    return this.http.put(this.BASEURL+`subscriptions/`+id+`/change_status`,  {status : status} );
  }

  getSubscriptionManagerList(){
    return this.http.get(this.BASEURL+`manager/subscriptions`);

  }

  renouvellerOff(renouvelle) {
    return this.http.post(this.BASEURL+`manager/subscriptions`, renouvelle);
  }

  effectuerOffre(renouvelle) {
    return this.http.post(this.BASEURL+`subscriptions`, renouvelle);
  }

  updateOffre(renouvelle , id) {    
    return this.http.put(this.BASEURL+`subscriptions/`+id, renouvelle);
  }





}
