import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  BASEURL=environment.basUrl;
  constructor(private http: HttpClient) { }

<<<<<<< HEAD
  getAlOffers() { return this.http.get(this.BASEURL+`offers`); }
  add(data:any) {return this.http.post<any>(this.BASEURL+`offers`, data);}
  getAllActivites() { return this.http.get(this.BASEURL+`activities?list=1`); }
  changeStatus(id,status) {return this.http.put(this.BASEURL+`offers`+'/change_status/'+id,{'status':status});}
=======

  getAlOffers(page:string) {
    let params = new HttpParams().set('page', page); 
    return this.http.get(this.BASEURL+`offers/`, { params: params } )}


  changeStatus(id,status)
  { 
    return this.http.put(this.BASEURL+`offers`+'/change_status/'+id,{'status':status});
  }
>>>>>>> 0228a7ab93b92563a9c3082403499642c1d24437


  addNewOffre(newOffre)
  { return this.http.post(this.BASEURL+`offers` , newOffre);
  }

}

