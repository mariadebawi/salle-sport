import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {stripUnnecessaryQuotes} from '@angular/compiler/src/render3/view/style_parser';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  BASEURL=environment.basUrl;
  constructor(private http: HttpClient) { }

  getAlOffers() { return this.http.get(this.BASEURL+`offers`); }

  changeStatus(id,status)
  { 
    return this.http.put(this.BASEURL+`offers`+'/change_status/'+id,{'status':status});
  }

}

