import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {stripUnnecessaryQuotes} from '@angular/compiler/src/render3/view/style_parser';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  BASEURL=environment.basUrl;
  constructor(private http: HttpClient) { }


  getAlOffers(page:string) {
    let params = new HttpParams().set('page', page); 
    return this.http.get(this.BASEURL+`offers/`, { params: params } )}


  changeStatus(id,status)
  { 
    return this.http.put(this.BASEURL+`offers`+'/change_status/'+id,{'status':status});
  }


  addNewOffre(newOffre)
  { return this.http.post(this.BASEURL+`offers` , newOffre);
  }

}

