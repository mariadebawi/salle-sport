import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  BASEURL=environment.basUrl;
  constructor(private http: HttpClient) { }


  getAllGyms(page:string) {
    let params = new HttpParams().set('page', page); 
    return this.http.get(this.BASEURL+`gyms`, { params: params } )
  }

  getAllManger(page:string) {
    let params = new HttpParams().set('page', page); 
    return this.http.get(this.BASEURL+`managers`, { params: params } )
  }

  changeStatusMang(id)
  { 
    return this.http.put(this.BASEURL+`managers/change_status/`+id,{'status':status});
  }


}
